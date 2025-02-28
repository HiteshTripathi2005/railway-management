import Booking from "../models/booking.model.js";
import Train from "../models/train.model.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for train availability
    const train = await Train.findById(req.body.train);
    if (!train) {
      return next(
        new ErrorResponse(`Train not found with id of ${req.body.train}`, 404)
      );
    }

    // Check seat availability
    const selectedClass = train.classes.find((c) => c.name === req.body.class);
    if (!selectedClass) {
      return next(new ErrorResponse(`Class ${req.body.class} not found`, 400));
    }

    if (selectedClass.availableSeats < req.body.passengers.length) {
      return next(
        new ErrorResponse(
          `Not enough seats available in ${req.body.class} class`,
          400
        )
      );
    }

    // Calculate total fare
    const totalFare = selectedClass.fare * req.body.passengers.length;
    req.body.totalFare = totalFare;

    const booking = await Booking.create(req.body);

    // Update available seats
    selectedClass.availableSeats -= req.body.passengers.length;
    await train.save();

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    let query;

    if (req.user.role !== "admin") {
      query = Booking.find({ user: req.user.id });
    } else {
      query = Booking.find();
    }

    const bookings = await query.populate({
      path: "train",
      select:
        "trainName trainNumber source destination departureTime arrivalTime",
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "train",
      select:
        "trainName trainNumber source destination departureTime arrivalTime",
    });

    if (!booking) {
      return next(
        new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(`Not authorized to access this booking`, 401)
      );
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(
        new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(`Not authorized to cancel this booking`, 401)
      );
    }

    // Check if booking can be cancelled (e.g., not too close to departure)
    const train = await Train.findById(booking.train);
    const departureTime = new Date(train.departureTime);
    const now = new Date();
    const hoursDifference = (departureTime - now) / (1000 * 60 * 60);

    if (hoursDifference < 4) {
      return next(
        new ErrorResponse(
          `Booking cannot be cancelled less than 4 hours before departure`,
          400
        )
      );
    }

    // Update booking status
    booking.status = "Cancelled";
    await booking.save();

    // Update available seats
    const selectedClass = train.classes.find((c) => c.name === booking.class);
    selectedClass.availableSeats += booking.passengers.length;
    await train.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
