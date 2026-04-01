import mongoose from "mongoose";
import { IBusBooking } from "../interface/booking.types.js";

const busBookingSchema = new mongoose.Schema<IBusBooking>(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: [true, "Bus is required"],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    passengerName: {
      type: String,
      required: [true, "Passenger name is required"],
      trim: true,
      minlength: [2, "Passenger name must be at least 2 characters"],
      maxlength: [80, "Passenger name cannot exceed 80 characters"],
    },
    passengerEmail: {
      type: String,
      required: [true, "Passenger email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      index: true,
    },
    passengerPhone: {
      type: String,
      required: [true, "Passenger phone is required"],
      trim: true,
      match: [/^[+1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    numberOfSeats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: [1, "At least one seat is required"],
      max: [10, "Maximum 10 seats allowed per booking"],
    },
    seatNumbers: {
      type: [String],
      default: [],
    },
    boardingPoint: {
      type: String,
      trim: true,
      maxlength: [120, "Boarding point cannot exceed 120 characters"],
    },
    droppingPoint: {
      type: String,
      trim: true,
      maxlength: [120, "Dropping point cannot exceed 120 characters"],
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
      index: true,
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [1000, "Special requests cannot exceed 1000 characters"],
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Base price cannot be negative"],
      },
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      taxes: {
        type: Number,
        required: [true, "Taxes are required"],
        min: [0, "Taxes cannot be negative"],
      },
      discountPrice: {
        type: Number,
        min: [0, "Discount amount cannot be negative"],
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"],
      },
      currency: {
        type: String,
        enum: ["USD", "INR", "EUR", "GBP"],
        default: "INR",
        required: [true, "Currency is required"],
      },
    },
    finalAmount: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },
    bookingStatus: {
      type: String,
      required: [true, "Booking status is required"],
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "upi", "net_banking", "wallet"],
    },
    transactionId: {
      type: String,
      trim: true,
      index: true,
    },
    rescheduledAt: {
      type: Date,
    },
    rescheduleReason: {
      type: String,
      trim: true,
      maxlength: [500, "Reschedule reason cannot exceed 500 characters"],
    },
    cancellationReason: {
      type: String,
      trim: true,
      maxlength: [500, "Cancellation reason cannot exceed 500 characters"],
    },
    cancellationRequestedAt: {
      type: Date,
    },
    cancellationApprovedAt: {
      type: Date,
    },
    refundAmount: {
      type: Number,
      min: [0, "Refund amount cannot be negative"],
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

busBookingSchema.index({ user: 1, createdAt: -1 });
busBookingSchema.index({ bus: 1, travelDate: 1 });
busBookingSchema.index({ bookingStatus: 1, paymentStatus: 1 });
busBookingSchema.index({ transactionId: 1, paymentStatus: 1 });
busBookingSchema.index({ "history.actor": 1, "history.createdAt": -1 });

const BusBooking = mongoose.model<IBusBooking>("BusBooking", busBookingSchema);

export default BusBooking;
