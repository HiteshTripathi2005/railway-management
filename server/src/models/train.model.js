import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: [true, "Please provide train number"],
    unique: true,
    trim: true,
  },
  trainName: {
    type: String,
    required: [true, "Please provide train name"],
    trim: true,
  },
  source: {
    type: String,
    required: [true, "Please provide source station"],
  },
  destination: {
    type: String,
    required: [true, "Please provide destination station"],
  },
  departureTime: {
    type: Date,
    required: [true, "Please provide departure time"],
  },
  arrivalTime: {
    type: Date,
    required: [true, "Please provide arrival time"],
  },
  duration: {
    type: String,
    required: [true, "Please provide journey duration"],
  },
  totalSeats: {
    type: Number,
    required: [true, "Please provide total seats"],
  },
  classes: [
    {
      name: {
        type: String,
        enum: ["1A", "2A", "3A", "SL", "CC", "2S"],
        required: true,
      },
      fare: {
        type: Number,
        required: true,
      },
      totalSeats: {
        type: Number,
        required: true,
      },
      availableSeats: {
        type: Number,
        required: true,
      },
    },
  ],
  daysOfWeek: [
    {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  ],
  status: {
    type: String,
    enum: ["Active", "Cancelled", "Delayed"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes for faster searching
trainSchema.index({ source: 1, destination: 1, departureTime: 1 });

const Train = mongoose.model("Train", trainSchema);

export default Train;
