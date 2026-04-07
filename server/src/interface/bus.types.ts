import mongoose from "mongoose";

export interface IBus {
  name: string;
  busNumber: string;
  busType: "seater" | "sleeper" | "semi_sleeper" | "luxury";
  vehicleType: string;
  source: string;
  destination: string;
  dateOfJourney: Date;
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  seats: {
    totalSeats: number;
    availableSeats: number;
  };
  pricing: {
    basePrice: number;
    currency: "USD" | "INR" | "EUR" | "GBP";
    discountPercentage: number;
    discountPrice?: number;
    taxes?: number;
    totalPrice?: number;
  };
  price: number;
  amenities: {
    wifi: boolean;
    chargingPoint: boolean;
    waterBottle: boolean;
    blanket: boolean;
    airConditioning: boolean;
    gpsTracking: boolean;
    emergencyContactAvailable: boolean;
  };
  rating: {
    averageRating: number;
    totalReviews: number;
    comfort: number;
    punctuality: number;
    staffBehavior: number;
    cleanliness: number;
    valueForMoney: number;
  };
  operator?: mongoose.Types.ObjectId;
  isActive: boolean;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
