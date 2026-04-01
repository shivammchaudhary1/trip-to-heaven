import mongoose from "mongoose";
import { IHotel } from "../interface/hotel.types.js";

const hotelSchema = new mongoose.Schema<IHotel>(
  {
    propertyName: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
      minlength: [3, "Property name must be at least 3 characters"],
      maxlength: [100, "Property name cannot exceed 100 characters"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["hotel", "resort", "apartment", "villa", "guesthouse", "hostel"],
      default: "hotel",
      index: true,
    },
    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, "Please enter a valid image URL"],
          },
          caption: {
            type: String,
            trim: true,
          },
          isPrimary: { type: Boolean, default: false },
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
    },
    location: {
      country: {
        type: String,
        required: true,
        index: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        index: true,
      },
      area: {
        type: String,
        index: true,
      },
      address: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
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
      totalReviews: { type: Number, default: 0 },
      cleanliness: { type: Number, min: 0, max: 5, default: 0 },
      comfort: { type: Number, min: 0, max: 5, default: 0 },
      service: { type: Number, min: 0, max: 5, default: 0 },
      location: { type: Number, min: 0, max: 5, default: 0 },
      facilities: { type: Number, min: 0, max: 5, default: 0 },
      staff: { type: Number, min: 0, max: 5, default: 0 },
      valueForMoney: { type: Number, min: 0, max: 5, default: 0 },
    },
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Price cannot be negative"],
      },
      subtotal: {
        type: Number,
        // required: [true, "Subtotal is required"],
        min: [0, "Subtotal cannot be negative"],
      },
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      taxes: {
        type: Number,
        min: [0, "Taxes cannot be negative"],
      },
      discountPrice: {
        type: Number,
        min: [0, "Discount cannot be negative"],
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
    amenities: {
      freeCancellation: { type: Boolean, default: false },
      freeWifi: { type: Boolean, default: true },
      airConditioning: { type: Boolean, default: true },
      heating: { type: Boolean, default: true },
      tv: { type: Boolean, default: true },
      pool: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      parking: { type: Boolean, default: true },
      freeParking: { type: Boolean, default: true },
      restaurant: { type: Boolean, default: true },
      bar: { type: Boolean, default: false },
      spa: { type: Boolean, default: false },
      wheelchairAccessible: { type: Boolean, default: true },
      elevator: { type: Boolean, default: true },
      petsAllowed: { type: Boolean, default: false },
      coupleFriendly: { type: Boolean, default: true },
      familyFriendly: { type: Boolean, default: false },
      smokingAllowed: { type: Boolean, default: false },
    },
    policies: {
      checkInTime: { type: String, default: "14:00" },
      checkOutTime: { type: String, default: "11:00" },
      cancellationPolicy: {
        type: String,
        enum: ["flexible", "moderate", "strict", "nonrefundable"],
        default: "moderate",
      },
      minStay: { type: Number, default: 1 },
      maxStay: { type: Number },
    },
    rooms: {
      totalRooms: { type: Number, required: true, min: 1 },
      availableRooms: { type: Number, required: true, min: 0 },
      roomTypes: [
        {
          category: String,
          capacity: Number,
          price: Number,
          count: Number,
        },
      ],
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        default: "triptoheaven.com",
      },
      website: {
        type: String,
        default: "www.example.com",
      },
    },
    owner: {
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
hotelSchema.index({ propertyName: "text", description: "text" });
hotelSchema.index({ "location.city": 1, "location.country": 1 });
hotelSchema.index({ "location.coordinates.coordinates": "2dsphere" });
hotelSchema.index({ "rating.averageRating": -1, isActive: 1 });
hotelSchema.index({ owner: 1, isActive: 1 });
hotelSchema.index({ isVerified: 1, isActive: 1 });

const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);

export default Hotel;
