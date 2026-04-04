import { Document, Types } from "mongoose";
import { IHotel } from "./hotel.types.js";
import { IUserExt } from "./user.types.js";
import { IFlight } from "./flight.types.js";

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

export interface IFlightBooking extends Document {
  flight: Types.ObjectId | IFlight;
  user: Types.ObjectId | IUserExt;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengers: {
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "other";
    dateOfBirth: Date;
    passportNumber?: string;
    passportExpiryDate?: Date;
    seatNumber?: string;
    seatClass: "economy" | "business" | "first";
  }[];
  numberOfPassengers: number;
  departureDate: Date;
  returnDate?: Date;
  tripType: "oneway" | "roundtrip";
  specialRequests?: string;
  pricing: {
    basePrice: number;
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
    | "boarded"
    | "completed"
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
  bookingType?: "hotel" | "flight";
  hotelBookingId?: Types.ObjectId;
  flightBookingId?: Types.ObjectId;
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
