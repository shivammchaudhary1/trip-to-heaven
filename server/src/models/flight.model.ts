import mongoose from "mongoose";
import { IFlight } from "../interface/flight.types.js";

const flightSchema = new mongoose.Schema<IFlight>(
  {
    flightNumber: {
      type: String,
      required: [true, "Flight number is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    airlineName: {
      type: String,
      required: [true, "Airline name is required"],
      trim: true,
      minlength: [2, "Airline name must be at least 2 characters"],
      maxlength: [100, "Airline name cannot exceed 100 characters"],
      index: true,
    },
    aircraftType: {
      type: String,
      required: [true, "Aircraft type is required"],
      trim: true,
      enum: [
        "Boeing 737",
        "Boeing 747",
        "Boeing 777",
        "Airbus A320",
        "Airbus A380",
        "Bombardier",
        "Embraer",
      ],
    },
    departureAirport: {
      code: {
        type: String,
        required: [true, "Departure airport code is required"],
        uppercase: true,
        match: [
          /^[A-Z]{3}$/,
          "Airport code must be exactly 3 uppercase letters",
        ],
      },
      name: {
        type: String,
        required: [true, "Departure airport name is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "Departure city is required"],
        trim: true,
        index: true,
      },
      country: {
        type: String,
        required: [true, "Departure country is required"],
        trim: true,
      },
    },
    arrivalAirport: {
      code: {
        type: String,
        required: [true, "Arrival airport code is required"],
        uppercase: true,
        match: [
          /^[A-Z]{3}$/,
          "Airport code must be exactly 3 uppercase letters",
        ],
      },
      name: {
        type: String,
        required: [true, "Arrival airport name is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "Arrival city is required"],
        trim: true,
        index: true,
      },
      country: {
        type: String,
        required: [true, "Arrival country is required"],
        trim: true,
      },
    },
    departureTime: {
      type: Date,
      required: [true, "Departure time is required"],
      index: true,
    },
    arrivalTime: {
      type: Date,
      required: [true, "Arrival time is required"],
    },
    duration: {
      type: Number,
      required: [true, "Flight duration is required"],
      min: [30, "Flight duration must be at least 30 minutes"],
    },
    distance: {
      type: Number,
      required: [true, "Distance is required"],
      min: [0, "Distance cannot be negative"],
    },
    route: {
      stops: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },
      stopoverAirports: [
        {
          code: {
            type: String,
            uppercase: true,
          },
          name: String,
          stopDuration: Number,
        },
      ],
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
        min: 0,
      },
      seatClasses: [
        {
          class: {
            type: String,
            enum: ["economy", "business", "first"],
            required: true,
          },
          totalSeats: {
            type: Number,
            required: true,
            min: 1,
          },
          availableSeats: {
            type: Number,
            required: true,
            min: 0,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
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
    amenities: {
      mealService: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      audioVisualEntertainment: {
        type: Boolean,
        default: true,
      },
      powerOutlets: {
        type: Boolean,
        default: false,
      },
      blanketPillow: {
        type: Boolean,
        default: true,
      },
      wheelchairAccessible: {
        type: Boolean,
        default: true,
      },
      carryOnAllowance: {
        type: Number,
        default: 7,
      },
      checkedBaggageAllowance: {
        type: Number,
        default: 20,
      },
    },
    rating: {
      averageRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        index: true,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
      comfort: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      service: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      cleanliness: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      timelinessOfDeparture: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      valueForMoney: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },
    operatingDays: {
      type: [String],
      default: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    operatingDate: {
      type: Date,
      required: [true, "Operating date is required"],
      index: true,
    },
    flightStatus: {
      type: String,
      enum: ["scheduled", "delayed", "cancelled", "completed"],
      default: "scheduled",
      index: true,
    },
    policies: {
      cancellationPolicy: {
        type: String,
        required: true,
        default: "Free cancellation up to 24 hours before departure",
      },
      refundable: {
        type: Boolean,
        default: true,
      },
      changeAllowed: {
        type: Boolean,
        default: true,
      },
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
flightSchema.index({ flightNumber: 1, operatingDate: 1 });
flightSchema.index({ "departureAirport.city": 1, "arrivalAirport.city": 1 });
flightSchema.index({ departureTime: 1, arrivalTime: 1 });
flightSchema.index({ "rating.averageRating": -1, isActive: 1 });
flightSchema.index({ operator: 1, isActive: 1 });
flightSchema.index({ isVerified: 1, isActive: 1 });
flightSchema.index({ flightStatus: 1, operatingDate: 1 });

const Flight = mongoose.model<IFlight>("Flight", flightSchema);

export default Flight;
