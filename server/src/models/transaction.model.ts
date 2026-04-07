import mongoose from "mongoose";
import { ITransaction } from "../interface/booking.types.js";

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    bookingType: {
      type: String,
      enum: {
        values: ["hotel", "flight", "bus"],
        message: "Booking type must be one of: hotel, flight, bus",
      },
      required: [true, "Booking type is required"],
    },
    hotelBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HotelBooking",
    },
    flightBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlightBooking",
    },
    busBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusBooking",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "INR", "EUR", "GBP"],
      default: "INR",
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: ["credit_card", "debit_card", "upi", "net_banking", "wallet"],
        message:
          "Payment method must be one of: credit_card, debit_card, upi, net_banking, or wallet",
      },
    },
    transactionStatus: {
      type: String,
      required: [true, "Transaction status is required"],
      enum: {
        values: ["pending", "completed", "failed", "refunded", "cancelled"],
        message:
          "Transaction status must be one of: pending, completed, failed, refunded, or cancelled",
      },
      default: "pending",
      index: true,
    },
    refundStatus: {
      type: String,
      enum: {
        values: ["not_refunded", "partial_refund", "full_refund"],
        message:
          "Refund status must be one of: not_refunded, partial_refund, or full_refund",
      },
      default: "not_refunded",
    },
    refundAmount: {
      type: Number,
      min: [0, "Refund amount cannot be negative"],
      validate: {
        validator: function (this: any, value: number) {
          if (value === undefined || value === null) return true;
          return value <= this.amount;
        },
        message: "Refund amount cannot exceed transaction amount",
      },
    },
    refundedAt: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
    paymentGateway: {
      type: String,
      enum: ["stripe", "razorpay", "paypal", "manual"],
      default: "manual",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    reference: {
      type: String,
      trim: true,
    },
    gatewayTransactionId: {
      type: String,
      trim: true,
      index: true,
    },
    gatewayReference: {
      type: String,
      trim: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    successResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    failureReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Indexes for better query performance
transactionSchema.index({ user: 1, transactionStatus: 1 });
transactionSchema.index({ bookingType: 1, transactionStatus: 1 });
transactionSchema.index({ hotelBookingId: 1, transactionStatus: 1 });
transactionSchema.index({ flightBookingId: 1, transactionStatus: 1 });
transactionSchema.index({ busBookingId: 1, transactionStatus: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ transactionStatus: 1, createdAt: -1 });
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ paymentGateway: 1, gatewayTransactionId: 1 });
transactionSchema.index({ refundStatus: 1, transactionStatus: 1 });

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema,
);

export default Transaction;
