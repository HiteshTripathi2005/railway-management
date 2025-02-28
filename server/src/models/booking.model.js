import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide passenger name"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Please provide passenger age"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Please provide passenger gender"],
  },
  seatNumber: {
    type: String,
  },
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  travelDate: {
    type: Date,
    required: [true, "Please provide travel date"],
  },
  passengers: [passengerSchema],
  class: {
    type: String,
    enum: ["1A", "2A", "3A", "SL", "CC", "2S"],
    required: [true, "Please select class"],
  },
  totalFare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Confirmed", "Waiting", "Cancelled"],
    default: "Confirmed",
  },
  pnrNumber: {
    type: String,
    unique: true,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
});

// Generate PNR before saving
bookingSchema.pre("save", async function (next) {
  if (!this.pnrNumber) {
    // Generate 10 digit PNR
    this.pnrNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
