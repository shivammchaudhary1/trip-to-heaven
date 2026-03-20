import mongoose from "mongoose";
import { IFlightBooking } from "../interface/booking.types.js";

const passengerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other",
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value: Date) {
          return value < new Date();
        },
        message: "Invalid date of birth",
      },
    },
    passportNumber: {
      type: String,
      trim: true,
      sparse: true,
    },
    passportExpiryDate: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          if (!value) return true;
          return value > new Date();
        },
        message: "Passport expiry date must be in the future",
      },
    },
    seatNumber: {
      type: String,
      trim: true,
      sparse: true,
    },
    seatClass: {
      type: String,
      required: [true, "Seat class is required"],
      enum: {
        values: ["economy", "business", "first"],
        message: "Seat class must be economy, business, or first",
      },
    },
  },
  { _id: false },
);

const flightBookingSchema = new mongoose.Schema<IFlightBooking>(
  {
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: [true, "Flight is required"],
      index: true,
    },
    user: {
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
      maxlength: [50, "Passenger name cannot exceed 50 characters"],
    },
    passengerEmail: {
      type: String,
      required: [true, "Passenger email is required"],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    passengerPhone: {
      type: String,
      required: [true, "Passenger phone is required"],
      match: [/^[+1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    passengers: {
      type: [passengerSchema],
      required: [true, "At least one passenger is required"],
      validate: {
        validator: function (passengers: any[]) {
          return passengers && passengers.length > 0;
        },
        message: "At least one passenger is required",
      },
    },
    numberOfPassengers: {
      type: Number,
      required: [true, "Number of passengers is required"],
      min: [1, "At least 1 passenger is required"],
      max: [9, "Maximum 9 passengers allowed"],
    },
    departureDate: {
      type: Date,
      required: [true, "Departure date is required"],
      index: true,
    },
    returnDate: {
      type: Date,
      validate: {
        validator: function (this: any, value) {
          if (!value) return true;
          return value > this.departureDate;
        },
        message: "Return date must be after departure date",
      },
    },
    tripType: {
      type: String,
      required: [true, "Trip type is required"],
      enum: {
        values: ["oneway", "roundtrip"],
        message: "Trip type must be oneway or roundtrip",
      },
      default: "oneway",
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
        min: [0, "Price cannot be negative"],
      },
      subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        min: [0, "Subtotal cannot be negative"],
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
    },
    bookingStatus: {
      type: String,
      required: [true, "Booking status is required"],
      enum: {
        values: [
          "pending",
          "confirmed",
          "checked_in",
          "boarded",
          "completed",
          "cancelled",
          "no_show",
        ],
        message:
          "Booking status must be one of: pending, confirmed, checked_in, boarded, completed, cancelled, or no_show",
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
    paymentMethod: {
      type: String,
      enum: {
        values: ["credit_card", "debit_card", "upi", "net_banking", "wallet"],
        message:
          "Payment method must be one of: credit_card, debit_card, upi, net_banking, or wallet",
      },
    },
    transactionId: {
      type: String,
      trim: true,
      sparse: true,
      index: true,
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
    },
    confirmationCode: {
      type: String,
      required: [true, "Confirmation code is required"],
      unique: true,
      trim: true,
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
flightBookingSchema.index({ user: 1, bookingStatus: 1 });
flightBookingSchema.index({ flight: 1, departureDate: 1 });
flightBookingSchema.index({ createdAt: -1 });
flightBookingSchema.index({ paymentStatus: 1, bookingStatus: 1 });
flightBookingSchema.index({ confirmationCode: 1 });
flightBookingSchema.index({ departureDate: 1, returnDate: 1 });
flightBookingSchema.index({ tripType: 1, bookingStatus: 1 });

const FlightBooking = mongoose.model<IFlightBooking>(
  "FlightBooking",
  flightBookingSchema,
);

export default FlightBooking;
