import mongoose from "mongoose";
import { IHotelBooking } from "../interface/booking.types.js";

const hotelBookingSchema = new mongoose.Schema<IHotelBooking>(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel is required"],
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
      minlength: [2, "Guest name must be at least 2 characters"],
      maxlength: [50, "Guest name cannot exceed 50 characters"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest is required"],
      max: [20, "Maximum 20 guests allowed"],
    },
    numberOfRooms: {
      type: Number,
      required: [true, "Number of rooms is required"],
      min: [1, "At least 1 room is required"],
      max: [10, "Maximum 10 rooms allowed"],
    },
    roomType: {
      type: String,
      trim: true,
    },
    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOutDate: {
      type: Date,
      required: [true, "Check-out date is required"],
      validate: {
        validator: function (this: any, value: Date) {
          return value > this.checkInDate;
        },
        message: "Check-out date must be after check-in date",
      },
    },
    numberOfNights: {
      type: Number,
      required: [true, "Number of nights is required"],
      min: [1, "At least 1 night is required"],
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [1000, "Special requests cannot exceed 1000 characters"],
    },
    pricing: {
      roomPrice: {
        type: Number,
        required: [true, "Room price is required"],
        min: [0, "Price cannot be negative"],
      },
      taxes: {
        type: Number,
        required: [true, "Taxes is required"],
        min: [0, "Taxes cannot be negative"],
      },
      discountAmount: {
        type: Number,
        min: [0, "Discount cannot be negative"],
      },
      discountPercentage: {
        type: Number,
        min: [0, "Discount percentage cannot be negative"],
        max: [100, "Discount percentage cannot exceed 100"],
      },
      totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"],
      },
      currency: {
        type: String,
        required: [true, "Currency is required"],
        enum: ["USD", "INR", "EUR", "GBP"],
        default: "INR",
      },
      subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        min: [0, "Subtotal cannot be negative"],
      },
    },
    bookingStatus: {
      type: String,
      required: [true, "Booking status is required"],
      enum: {
        values: [
          "pending",
          "confirmed",
          "checked_in",
          "checked_out",
          "cancelled",
          "no_show",
        ],
        message:
          "Booking status must be one of: pending, confirmed, checked_in, checked_out, cancelled, or no_show",
      },
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
      enum: {
        values: ["pending", "completed", "failed", "refunded"],
        message:
          "Payment status must be one of: pending, completed, failed, or refunded",
      },
      default: "pending",
      index: true,
    },
    transactionId: {
      type: String,
      trim: true,
      sparse: true,
      index: true,
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

// Indexes for better query performance
hotelBookingSchema.index({ user: 1, bookingStatus: 1 });
hotelBookingSchema.index({ hotel: 1, checkInDate: 1 });
hotelBookingSchema.index({ createdAt: -1 });
hotelBookingSchema.index({ paymentStatus: 1, bookingStatus: 1 });
hotelBookingSchema.index({ confirmationCode: 1 });
hotelBookingSchema.index({ checkInDate: 1, checkOutDate: 1 });

const HotelBooking = mongoose.model<IHotelBooking>(
  "HotelBooking",
  hotelBookingSchema,
);

export default HotelBooking;
