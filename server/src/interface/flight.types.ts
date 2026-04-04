import mongoose from "mongoose";

export interface IFlight {
  flightNumber: string;
  airlineName: string;
  aircraftType: string;
  departureAirport: {
    code: string;
    name: string;
    city: string;
    country: string;
  };
  arrivalAirport: {
    code: string;
    name: string;
    city: string;
    country: string;
  };
  departureTime: Date;
  arrivalTime: Date;
  duration: number; // in minutes
  distance: number; // in kilometers
  route: {
    stops: number;
    stopoverAirports?: {
      code: string;
      name: string;
      stopDuration?: number; // in minutes
    }[];
  };
  seats: {
    totalSeats: number;
    availableSeats: number;
    seatClasses: {
      class: "economy" | "business" | "first";
      totalSeats: number;
      availableSeats: number;
      price: number;
    }[];
  };
  pricing: {
    basePrice: number;
    currency: string;
    discountPercentage: number;
    discountPrice: number;
    taxes: number;
    totalPrice: number;
  };
  amenities: {
    mealService: boolean;
    wifi: boolean;
    audioVisualEntertainment: boolean;
    powerOutlets: boolean;
    blanketPillow: boolean;
    wheelchairAccessible: boolean;
    carryOnAllowance: number; // in kg
    checkedBaggageAllowance: number; // in kg
  };
  rating: {
    averageRating: number;
    totalReviews: number;
    comfort: number;
    service: number;
    cleanliness: number;
    timelinessOfDeparture: number;
    valueForMoney: number;
  };
  operatingDays: string[]; // e.g., ["Monday", "Tuesday", "Wednesday"]
  operatingDate: Date;
  flightStatus: "scheduled" | "delayed" | "cancelled" | "completed";
  policies: {
    cancellationPolicy: string;
    refundable: boolean;
    changeAllowed: boolean;
  };
  operator: mongoose.Types.ObjectId; // Reference to User (airline)
  isActive: boolean;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
