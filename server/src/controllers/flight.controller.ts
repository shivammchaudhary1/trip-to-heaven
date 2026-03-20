import Flight from "../models/flight.model.js";
import { Request, Response } from "express";

const addFlight = async (req: Request, res: Response) => {
  try {
    const {
      flightNumber,
      airlineName,
      aircraftType,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      duration,
      distance,
      route,
      seats,
      pricing,
      amenities,
      rating,
      operatingDays,
      operatingDate,
      flightStatus,
      policies,
      operator: bodyOperator,
    } = req.body;

    // Use operator from body or userId from JWT middleware
    const userId = req.userId || bodyOperator;

    // Validate operator/userId
    if (!userId) {
      return res.status(401).json({
        message:
          "Operator ID is required. Please provide operator in request body or authenticate with token.",
        success: false,
      });
    }

    // Validate required fields
    const requiredFields = {
      flightNumber: "Flight number",
      airlineName: "Airline name",
      aircraftType: "Aircraft type",
      departureAirport: "Departure airport",
      arrivalAirport: "Arrival airport",
      departureTime: "Departure time",
      arrivalTime: "Arrival time",
      duration: "Duration",
      distance: "Distance",
      seats: "Seats information",
      pricing: "Pricing",
      operatingDate: "Operating date",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `${label} is required`,
          success: false,
        });
      }
    }

    // Validate departure airport required fields
    if (
      !departureAirport.code ||
      !departureAirport.name ||
      !departureAirport.city ||
      !departureAirport.country
    ) {
      return res.status(400).json({
        message: "Departure airport must include code, name, city, and country",
        success: false,
      });
    }

    // Validate arrival airport required fields
    if (
      !arrivalAirport.code ||
      !arrivalAirport.name ||
      !arrivalAirport.city ||
      !arrivalAirport.country
    ) {
      return res.status(400).json({
        message: "Arrival airport must include code, name, city, and country",
        success: false,
      });
    }

    // Validate pricing required fields
    if (!pricing.basePrice) {
      return res.status(400).json({
        message: "Base price is required",
        success: false,
      });
    }

    // Validate seats required fields
    if (!seats.totalSeats || seats.availableSeats === undefined) {
      return res.status(400).json({
        message: "Total seats and available seats are required",
        success: false,
      });
    }

    // Calculate total price with discount and taxes
    const basePrice = pricing.basePrice;
    const discountPercentage = pricing.discountPercentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;
    const discountPrice = basePrice - discountAmount;
    const taxes = pricing.taxes || 0;
    const totalPrice = discountPrice + taxes;

    // Check if flight with same number already exists for same operating date
    const existingFlight = await Flight.findOne({
      flightNumber: { $regex: `^${flightNumber}$`, $options: "i" },
      operatingDate: new Date(operatingDate),
    });

    if (existingFlight) {
      return res.status(409).json({
        message: "Flight with this number already exists on this date",
        success: false,
      });
    }

    // Create new flight with proper structure
    const newFlight = new Flight({
      flightNumber: flightNumber.trim().toUpperCase(),
      airlineName: airlineName.trim(),
      aircraftType,
      departureAirport: {
        code: departureAirport.code.trim().toUpperCase(),
        name: departureAirport.name.trim(),
        city: departureAirport.city.trim(),
        country: departureAirport.country.trim(),
      },
      arrivalAirport: {
        code: arrivalAirport.code.trim().toUpperCase(),
        name: arrivalAirport.name.trim(),
        city: arrivalAirport.city.trim(),
        country: arrivalAirport.country.trim(),
      },
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      duration,
      distance,
      route: {
        stops: route?.stops || 0,
        stopoverAirports: Array.isArray(route?.stopoverAirports)
          ? route.stopoverAirports
          : [],
      },
      seats: {
        totalSeats: seats.totalSeats,
        availableSeats: seats.availableSeats,
        seatClasses: Array.isArray(seats.seatClasses) ? seats.seatClasses : [],
      },
      pricing: {
        basePrice,
        currency: pricing.currency || "INR",
        discountPercentage,
        discountPrice,
        taxes,
        totalPrice,
      },
      amenities: {
        mealService: amenities?.mealService || false,
        wifi: amenities?.wifi || false,
        audioVisualEntertainment: amenities?.audioVisualEntertainment || true,
        powerOutlets: amenities?.powerOutlets || false,
        blanketPillow: amenities?.blanketPillow || true,
        wheelchairAccessible: amenities?.wheelchairAccessible || true,
        carryOnAllowance: amenities?.carryOnAllowance || 7,
        checkedBaggageAllowance: amenities?.checkedBaggageAllowance || 20,
      },
      rating: {
        averageRating: 0,
        totalReviews: 0,
        comfort: 0,
        service: 0,
        cleanliness: 0,
        timelinessOfDeparture: 0,
        valueForMoney: 0,
      },
      operatingDays: Array.isArray(operatingDays)
        ? operatingDays
        : [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
      operatingDate: new Date(operatingDate),
      flightStatus: flightStatus || "scheduled",
      policies: {
        cancellationPolicy:
          policies?.cancellationPolicy ||
          "Free cancellation up to 24 hours before departure",
        refundable: policies?.refundable !== false,
        changeAllowed: policies?.changeAllowed !== false,
      },
      operator: userId,
      isActive: true,
      isVerified: false,
    });

    await newFlight.save();

    return res.status(201).json({
      message: "Flight added successfully",
      success: true,
      data: newFlight,
    });
  } catch (error: any) {
    console.error("Add flight error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err: any) => err.message)
        .join(", ");
      return res.status(400).json({
        message: messages,
        success: false,
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        message: `Flight with this ${field} already exists`,
        success: false,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const removeFlight = async (req: Request, res: Response) => {
  try {
    const { flightId } = req.params;
    const userId = req.userId;

    // Validate flightId format
    if (!flightId) {
      return res.status(400).json({
        message: "Invalid flight ID",
        success: false,
      });
    }

    // Find and verify ownership
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
        success: false,
      });
    }

    if (flight.operator.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this flight",
        success: false,
      });
    }

    // Soft delete - set isActive to false
    flight.isActive = false;
    await flight.save();

    return res.status(200).json({
      message: "Flight deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Remove flight error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateFlight = async (req: Request, res: Response) => {
  try {
    const { flightId } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    // Validate flightId format
    if (!flightId || flightId.length !== 24) {
      return res.status(400).json({
        message: "Invalid flight ID",
        success: false,
      });
    }

    // Find and verify ownership
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
        success: false,
      });
    }

    if (flight.operator.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to update this flight",
        success: false,
      });
    }

    // Fields that should not be updated
    const restricedFields = ["operator", "isVerified", "createdAt"];
    restricedFields.forEach((field) => {
      delete updateData[field];
    });

    // Update flight
    const updatedFlight = await Flight.findByIdAndUpdate(flightId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Flight updated successfully",
      success: true,
      data: updatedFlight,
    });
  } catch (error) {
    console.error("Update flight error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getAllFlights = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      departureCity,
      arrivalCity,
      minPrice,
      maxPrice,
      flightStatus,
      airline,
    } = req.query;

    // Build filter query
    const filter: any = { isActive: true };

    if (departureCity) {
      filter["departureAirport.city"] = {
        $regex: departureCity,
        $options: "i",
      };
    }

    if (arrivalCity) {
      filter["arrivalAirport.city"] = { $regex: arrivalCity, $options: "i" };
    }

    if (airline) {
      filter.airlineName = { $regex: airline, $options: "i" };
    }

    if (flightStatus) {
      filter.flightStatus = flightStatus;
    }

    if (minPrice || maxPrice) {
      filter["pricing.basePrice"] = {};
      if (minPrice) filter["pricing.basePrice"].$gte = Number(minPrice);
      if (maxPrice) filter["pricing.basePrice"].$lte = Number(maxPrice);
    }

    // Calculate pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(50, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Fetch flights
    const flights = await Flight.find(filter)
      .sort({ departureTime: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("operator", "name email");

    // Get total count
    const totalCount = await Flight.countDocuments(filter);

    return res.status(200).json({
      message: "Flights fetched successfully",
      success: true,
      data: flights,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        pages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error("Get all flights error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getFlightById = async (req: Request, res: Response) => {
  try {
    const { flightId } = req.params;

    // Validate flightId format
    if (!flightId || flightId.length !== 24) {
      return res.status(400).json({
        message: "Invalid flight ID",
        success: false,
      });
    }

    // Fetch flight
    const flight = await Flight.findById(flightId).populate(
      "operator",
      "name email",
    );

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
        success: false,
      });
    }

    if (!flight.isActive) {
      return res.status(404).json({
        message: "Flight is no longer available",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Flight fetched successfully",
      success: true,
      data: flight,
    });
  } catch (error) {
    console.error("Get flight by ID error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const searchFlights = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      departureAirport,
      arrivalAirport,
      departDate,
      minPrice,
      maxPrice,
    } = req.query;

    // Build filter query
    const filter: any = { isActive: true, flightStatus: "scheduled" };

    if (departureAirport) {
      filter["departureAirport.code"] = {
        $regex: `^${departureAirport}$`,
        $options: "i",
      };
    }

    if (arrivalAirport) {
      filter["arrivalAirport.code"] = {
        $regex: `^${arrivalAirport}$`,
        $options: "i",
      };
    }

    // Filter by departure date (same day)
    if (departDate) {
      const searchDate = new Date(departDate as string);
      const nextDate = new Date(searchDate);
      nextDate.setDate(nextDate.getDate() + 1);

      filter.departureTime = {
        $gte: searchDate,
        $lt: nextDate,
      };
    }

    if (minPrice || maxPrice) {
      filter["pricing.basePrice"] = {};
      if (minPrice) filter["pricing.basePrice"].$gte = Number(minPrice);
      if (maxPrice) filter["pricing.basePrice"].$lte = Number(maxPrice);
    }

    // Calculate pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(50, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Fetch flights
    const flights = await Flight.find(filter)
      .sort({ departureTime: 1 })
      .skip(skip)
      .limit(limitNum)
      .populate("operator", "name email");

    // Get total count
    const totalCount = await Flight.countDocuments(filter);

    return res.status(200).json({
      message: "Flights fetched successfully",
      success: true,
      data: flights,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        pages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error("Search flights error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export {
  addFlight,
  removeFlight,
  updateFlight,
  getAllFlights,
  getFlightById,
  searchFlights,
};
