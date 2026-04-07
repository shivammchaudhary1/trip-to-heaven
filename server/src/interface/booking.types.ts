import { Document, Types } from "mongoose";
import { IHotel } from "./hotel.types.js";
import { IUserExt } from "./user.types.js";
import { IFlight } from "./flight.types.js";
import { IBus } from "./bus.types.js";

export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP";
export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "upi"
  | "net_banking"
  | "wallet";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "cancelled";
export type BookingType = "hotel" | "flight" | "bus";

export interface IBookingHistoryEntry {
  action:
    | "booked"
    | "rescheduled"
    | "cancelled"
    | "payment_updated"
    | "status_updated";
  actor: Types.ObjectId | IUserExt;
  actorRoles: string[];
  previousStatus?: string;
  newStatus?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface IHotelBooking extends Document {
  hotelId: Types.ObjectId | IHotel;
  userId: Types.ObjectId | IUserExt;
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
    currency: CurrencyCode;
  };
  bookingStatus:
    | "pending"
    | "confirmed"
    | "checked_in"
    | "checked_out"
    | "cancelled"
    | "no_show";
  finalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
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

export interface IFlightBooking extends Document {
  flightId: Types.ObjectId | IFlight;
  userId: Types.ObjectId | IUserExt;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  numberOfSeats: number;
  seatNumbers?: string[];
  departureDate: Date;
  returnDate?: Date;
  tripType: "oneway" | "roundtrip";
  specialRequests?: string;
  pricing: {
    basePrice: number;
    subtotal: number;
    taxes: number;
    discountPrice?: number;
    discountPercentage?: number;
    totalPrice: number;
    currency: CurrencyCode;
  };
  finalAmount: number;
  bookingStatus:
    | "pending"
    | "confirmed"
    | "checked_in"
    | "boarded"
    | "completed"
    | "cancelled"
    | "no_show";
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  cancellationReason?: string;
  cancellationRequestedAt?: Date;
  cancellationApprovedAt?: Date;
  refundAmount?: number;
  confirmationCode: string;
  transactionId?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction extends Document {
  transactionId: string;
  userId: Types.ObjectId | IUserExt;
  bookingType?: BookingType;
  hotelBookingId?: Types.ObjectId;
  flightBookingId?: Types.ObjectId;
  busBookingId?: Types.ObjectId;
  amount: number;
  currency: CurrencyCode;
  paymentMethod: PaymentMethod;
  paymentGateway?: "stripe" | "razorpay" | "paypal" | "manual";
  transactionStatus: TransactionStatus;
  description?: string;
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

export interface IBusBooking extends Document {
  busId: Types.ObjectId | IBus;
  userId: Types.ObjectId | IUserExt;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  numberOfSeats: number;
  seatNumbers?: string[];
  boardingPoint?: string;
  droppingPoint?: string;
  travelDate: Date;
  specialRequests?: string;
  pricing: {
    seatFare: number;
    subtotal: number;
    taxes: number;
    discountAmount?: number;
    totalPrice: number;
    currency: CurrencyCode;
  };
  finalAmount: number;
  bookingStatus: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  rescheduledAt?: Date;
  rescheduleReason?: string;
  cancellationReason?: string;
  cancellationRequestedAt?: Date;
  cancellationApprovedAt?: Date;
  refundAmount?: number;
  confirmationCode: string;
  notes?: string;
  history: IBookingHistoryEntry[];
  createdAt?: Date;
  updatedAt?: Date;
}
