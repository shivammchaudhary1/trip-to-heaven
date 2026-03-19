import mongoose from "mongoose";
export interface IHotel {
  propertyName: string;
  description: string;
  propertyType:
    | "hotel"
    | "resort"
    | "apartment"
    | "villa"
    | "guesthouse"
    | "hostel";
  images: string[];
  location: {
    country: string;
    state: string;
    city: string;
    area?: string;
    address: string;
    zipCode?: string;
  };
  rating: {
    averageRating: number;
    totalReviews: number;
    cleanliness: number;
    comfort: number;
    service: number;
    location: number;
    facilities: number;
    staff: number;
    valueForMoney: number;
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
    freeCancellation: boolean;
    freeWifi: boolean;
    airConditioning: boolean;
    heating: boolean;
    tv: boolean;
    pool: boolean;
    gym: boolean;
    parking: boolean;
    freeParking: boolean;
    restaurant: boolean;
    bar: boolean;
    spa: boolean;
    wheelchairAccessible: boolean;
    elevator: boolean;
    petsAllowed: boolean;
    coupleFriendly: boolean;
    familyFriendly: boolean;
    smokingAllowed: boolean;
  };
  policies: {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    minStay: number;
    maxStay: number;
  };
  rooms: {
    totalRooms: number;
    availableRooms: number;
    roomTypes: {
      type: string;
      capacity: number;
      price: number;
      count: number;
    }[];
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  owner: mongoose.Types.ObjectId;
  isActive: boolean;
  isVerified: boolean;
}
