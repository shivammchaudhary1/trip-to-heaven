import { Document, Types } from "mongoose";
import { IHotel } from "./hotel.types.js";
import { IUserExt } from "./user.types.js";

export interface IHotelBooking extends Document {
  hotel: Types.ObjectId | IHotel;
  user: Types.ObjectId | IUserExt;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  numberOfGuests: number;
  numberOfRooms: number;
  roomType?: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfNights: number;
  specialRequests?: string;
  pricing: {
    roomPrice: number;
    subtotal: number;
    taxes: number;
    discountAmount?: number;
    discountPercentage?: number;
    totalPrice: number;
    currency: "USD" | "INR" | "EUR" | "GBP";
  };
  bookingStatus:
    | "pending"
    | "confirmed"
    | "checked_in"
    | "checked_out"
    | "cancelled"
    | "no_show";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  paymentMethod?:
    | "credit_card"
    | "debit_card"
    | "upi"
    | "net_banking"
    | "wallet";
  transactionId?: string;
  cancellationReason?: string;
  cancellationRequestedAt?: Date;
  cancellationApprovedAt?: Date;
  refundAmount?: number;
  confirmationCode: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction extends Document {
  transactionId: string;
  user: Types.ObjectId | IUserExt;
  booking?: Types.ObjectId | IHotelBooking;
  bookingType?: "hotel" | "flight";
  amount: number;
  currency: "USD" | "INR" | "EUR" | "GBP";
  paymentMethod:
    | "credit_card"
    | "debit_card"
    | "upi"
    | "net_banking"
    | "wallet";
  paymentGateway?: "stripe" | "razorpay" | "paypal" | "manual";
  transactionStatus:
    | "pending"
    | "completed"
    | "failed"
    | "refunded"
    | "cancelled";
  description: string;
  reference?: string;
  gatewayTransactionId?: string;
  gatewayReference?: string;
  metadata?: {
    [key: string]: any;
  };
  successResponse?: {
    [key: string]: any;
  };
  failureReason?: string;
  refundStatus?: "not_refunded" | "partial_refund" | "full_refund";
  refundAmount?: number;
  refundedAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
