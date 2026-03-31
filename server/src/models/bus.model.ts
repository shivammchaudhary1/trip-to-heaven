import mongoose from "mongoose";
import { IBus } from "../interface/bus.types.js";

const busSchema = new mongoose.Schema<IBus>(
  {
    name: {
      type: String,
      required: [true, "Bus name is required"],
      trim: true,
      minlength: [2, "Bus name must be at least 2 characters"],
      maxlength: [100, "Bus name cannot exceed 100 characters"],
      index: true,
    },
    busNumber: {
      type: String,
      required: [true, "Bus number is required"],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9-]{4,20}$/, "Please enter a valid bus number"],
      index: true,
    },
    busType: {
      type: String,
      enum: ["seater", "sleeper", "semi_sleeper", "luxury"],
      default: "seater",
      index: true,
    },
    source: {
      type: String,
      required: [true, "Source is required"],
      trim: true,
      minlength: [2, "Source must be at least 2 characters"],
      maxlength: [100, "Source cannot exceed 100 characters"],
      index: true,
    },
    dateOfJourney: {
      type: Date,
      required: [true, "Date of journey is required"],
      index: true,
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
      minlength: [2, "Destination must be at least 2 characters"],
      maxlength: [100, "Destination cannot exceed 100 characters"],
      index: true,
    },
    departureTime: {
      type: Date,
      required: [true, "Departure time is required"],
      index: true,
    },
    arrivalTime: {
      type: Date,
      required: [true, "Arrival time is required"],
      validate: {
        validator: function (this: any, value: Date) {
          return value > this.departureTime;
        },
        message: "Arrival time must be after departure time",
      },
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [30, "Duration must be at least 30 minutes"],
    },
    seats: {
      totalSeats: {
        type: Number,
        required: [true, "Total seats is required"],
        min: [1, "Total seats must be at least 1"],
      },
      availableSeats: {
        type: Number,
        required: [true, "Available seats is required"],
        min: [0, "Available seats cannot be negative"],
      },
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Price cannot be negative"],
      },
      currency: {
        type: String,
        default: "INR",
        enum: ["USD", "INR", "EUR", "GBP"],
      },
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      discountPrice: {
        type: Number,
        min: 0,
      },
      taxes: {
        type: Number,
        min: 0,
      },
      totalPrice: {
        type: Number,
        min: 0,
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },
    amenities: {
      wifi: { type: Boolean, default: false },
      chargingPoint: { type: Boolean, default: false },
      waterBottle: { type: Boolean, default: true },
      blanket: { type: Boolean, default: false },
      airConditioning: { type: Boolean, default: true },
      gpsTracking: { type: Boolean, default: true },
      emergencyContactAvailable: { type: Boolean, default: true },
    },
    rating: {
      averageRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        index: true,
      },
      totalReviews: { type: Number, default: 0 },
      comfort: { type: Number, min: 0, max: 5, default: 0 },
      punctuality: { type: Number, min: 0, max: 5, default: 0 },
      staffBehavior: { type: Number, min: 0, max: 5, default: 0 },
      cleanliness: { type: Number, min: 0, max: 5, default: 0 },
      valueForMoney: { type: Number, min: 0, max: 5, default: 0 },
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Indexes for better query performance
busSchema.index({ source: 1, destination: 1, dateOfJourney: 1 });
busSchema.index({ departureTime: 1, arrivalTime: 1 });
busSchema.index({ busType: 1, isActive: 1 });
busSchema.index({ "rating.averageRating": -1, isActive: 1 });
busSchema.index({ operator: 1, isActive: 1 });

const Bus = mongoose.model<IBus>("Bus", busSchema);

export default Bus;
