import Train from "../models/train.model.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get all trains
// @route   GET /api/trains
// @access  Public
export const getTrains = async (req, res, next) => {
  try {
    const trains = await Train.find();
    res.status(200).json({
      success: true,
      count: trains.length,
      data: trains,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single train
// @route   GET /api/trains/:id
// @access  Public
export const getTrain = async (req, res, next) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return next(
        new ErrorResponse(`Train not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: train,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new train
// @route   POST /api/trains
// @access  Private/Admin
export const createTrain = async (req, res, next) => {
  try {
    const train = await Train.create(req.body);
    res.status(201).json({
      success: true,
      data: train,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update train
// @route   PUT /api/trains/:id
// @access  Private/Admin
export const updateTrain = async (req, res, next) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!train) {
      return next(
        new ErrorResponse(`Train not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: train,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete train
// @route   DELETE /api/trains/:id
// @access  Private/Admin
export const deleteTrain = async (req, res, next) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);

    if (!train) {
      return next(
        new ErrorResponse(`Train not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search trains
// @route   GET /api/trains/search
// @access  Public
export const searchTrains = async (req, res, next) => {
  try {
    const { source, destination, date } = req.query;

    const query = {
      source,
      destination,
      departureTime: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    };

    const trains = await Train.find(query);

    res.status(200).json({
      success: true,
      count: trains.length,
      data: trains,
    });
  } catch (error) {
    next(error);
  }
};
