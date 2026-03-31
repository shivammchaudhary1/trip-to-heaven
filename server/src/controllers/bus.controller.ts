import mongoose from "mongoose";
import { Request, Response } from "express";
import Bus from "../models/bus.model.js";

const addBus = async (req: Request, res: Response) => {
  try {
    const {
      name,
      busNumber,
      busType,
      source,
      destination,
      dateOfJourney,
      departureTime,
      arrivalTime,
      duration,
      seats,
      pricing,
      amenities,
      operator: bodyOperator,
    } = req.body;

    const userId = req.userId || bodyOperator;

    if (!userId) {
      return res.status(401).json({
        message:
          "Operator ID is required. Please provide operator in request body or authenticate with token.",
        success: false,
      });
    }

    const requiredFields = {
      name: "Bus name",
      busNumber: "Bus number",
      source: "Source",
      destination: "Destination",
      dateOfJourney: "Date of journey",
      departureTime: "Departure time",
      arrivalTime: "Arrival time",
      duration: "Duration",
      seats: "Seats information",
      pricing: "Pricing",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `${label} is required`,
          success: false,
        });
      }
    }

    if (!seats.totalSeats || seats.availableSeats === undefined) {
      return res.status(400).json({
        message: "Total seats and available seats are required",
        success: false,
      });
    }

    if (!pricing.basePrice) {
      return res.status(400).json({
        message: "Base price is required",
        success: false,
      });
    }

    const existingBus = await Bus.findOne({
      busNumber: { $regex: `^${busNumber}$`, $options: "i" },
      dateOfJourney: new Date(dateOfJourney),
    });

    if (existingBus) {
      return res.status(409).json({
        message: "Bus with this number already exists for this journey date",
        success: false,
      });
    }

    const basePrice = Number(pricing.basePrice);
    const discountPercentage = Number(pricing.discountPercentage || 0);
    const discountAmount = (basePrice * discountPercentage) / 100;
    const discountPrice = basePrice - discountAmount;
    const taxes = Number(pricing.taxes || 0);
    const totalPrice = discountPrice + taxes;

    const newBus = new Bus({
      name: name.trim(),
      busNumber: busNumber.trim().toUpperCase(),
      busType: busType || "seater",
      source: source.trim(),
      destination: destination.trim(),
      dateOfJourney: new Date(dateOfJourney),
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      duration: Number(duration),
      seats: {
        totalSeats: Number(seats.totalSeats),
        availableSeats: Number(seats.availableSeats),
      },
      pricing: {
        basePrice,
        currency: pricing.currency || "INR",
        discountPercentage,
        discountPrice,
        taxes,
        totalPrice,
      },
      // Keep backward compatibility for existing consumers using top-level price.
      price: totalPrice,
      amenities: {
        wifi: amenities?.wifi || false,
        chargingPoint: amenities?.chargingPoint || false,
        waterBottle: amenities?.waterBottle !== false,
        blanket: amenities?.blanket || false,
        airConditioning: amenities?.airConditioning !== false,
        gpsTracking: amenities?.gpsTracking !== false,
        emergencyContactAvailable:
          amenities?.emergencyContactAvailable !== false,
      },
      rating: {
        averageRating: 0,
        totalReviews: 0,
        comfort: 0,
        punctuality: 0,
        staffBehavior: 0,
        cleanliness: 0,
        valueForMoney: 0,
      },
      operator: userId,
      isActive: true,
      isVerified: false,
    });

    await newBus.save();

    return res.status(201).json({
      message: "Bus added successfully",
      success: true,
      data: newBus,
    });
  } catch (error: any) {
    console.error("Add bus error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err: any) => err.message)
        .join(", ");

      return res.status(400).json({
        message: messages,
        success: false,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "bus number";
      return res.status(409).json({
        message: `Bus with this ${field} already exists`,
        success: false,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getAllBuses = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      source,
      destination,
      dateOfJourney,
      busType,
      minPrice,
      maxPrice,
    } = req.query;

    const filter: any = { isActive: true };

    if (source) {
      filter.source = { $regex: source, $options: "i" };
    }

    if (destination) {
      filter.destination = { $regex: destination, $options: "i" };
    }

    if (busType) {
      filter.busType = busType;
    }

    if (dateOfJourney) {
      const startDate = new Date(dateOfJourney as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.dateOfJourney = { $gte: startDate, $lt: endDate };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(50, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const buses = await Bus.find(filter)
      .sort({ departureTime: 1 })
      .skip(skip)
      .limit(limitNum)
      .populate("operator", "name email");

    const totalCount = await Bus.countDocuments(filter);

    return res.status(200).json({
      message: "Buses fetched successfully",
      success: true,
      data: buses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        pages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error("Get all buses error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getBusById = async (req: Request, res: Response) => {
  try {
    const busIdParam = req.params.busId;
    const busId = Array.isArray(busIdParam) ? busIdParam[0] : busIdParam;

    if (!busId || !mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({
        message: "Invalid bus ID",
        success: false,
      });
    }

    const bus = await Bus.findById(busId).populate("operator", "name email");

    if (!bus) {
      return res.status(404).json({
        message: "Bus not found",
        success: false,
      });
    }

    if (!bus.isActive) {
      return res.status(404).json({
        message: "Bus is no longer available",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Bus fetched successfully",
      success: true,
      data: bus,
    });
  } catch (error) {
    console.error("Get bus by ID error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateBus = async (req: Request, res: Response) => {
  try {
    const busIdParam = req.params.busId;
    const busId = Array.isArray(busIdParam) ? busIdParam[0] : busIdParam;
    const userId = req.userId;
    const updateData = { ...req.body };

    if (!busId || !mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({
        message: "Invalid bus ID",
        success: false,
      });
    }

    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        message: "Bus not found",
        success: false,
      });
    }

    if (bus.operator && bus.operator.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to update this bus",
        success: false,
      });
    }

    const restricedFields = ["operator", "isVerified", "createdAt"];
    restricedFields.forEach((field) => {
      delete updateData[field];
    });

    if (updateData.pricing) {
      const basePrice = Number(
        updateData.pricing.basePrice ?? bus.pricing.basePrice,
      );
      const discountPercentage = Number(
        updateData.pricing.discountPercentage ??
          bus.pricing.discountPercentage ??
          0,
      );
      const discountAmount = (basePrice * discountPercentage) / 100;
      const discountPrice = basePrice - discountAmount;
      const taxes = Number(updateData.pricing.taxes ?? bus.pricing.taxes ?? 0);
      const totalPrice = discountPrice + taxes;

      updateData.pricing = {
        ...bus.pricing,
        ...updateData.pricing,
        basePrice,
        discountPercentage,
        discountPrice,
        taxes,
        totalPrice,
      };
      updateData.price = totalPrice;
    }

    const updatedBus = await Bus.findByIdAndUpdate(busId, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedBus) {
      return res.status(404).json({
        message: "Bus not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Bus updated successfully",
      success: true,
      data: updatedBus,
    });
  } catch (error: any) {
    console.error("Update bus error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err: any) => err.message)
        .join(", ");

      return res.status(400).json({
        message: messages || "Validation failed",
        success: false,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid value in update payload",
        success: false,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const removeBus = async (req: Request, res: Response) => {
  try {
    const busIdParam = req.params.busId;
    const busId = Array.isArray(busIdParam) ? busIdParam[0] : busIdParam;
    const userId = req.userId;

    if (!busId || !mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({
        message: "Invalid bus ID",
        success: false,
      });
    }

    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        message: "Bus not found",
        success: false,
      });
    }

    if (bus.operator && bus.operator.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this bus",
        success: false,
      });
    }

    bus.isActive = false;
    await bus.save();

    return res.status(200).json({
      message: "Bus deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Remove bus error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { addBus, getAllBuses, getBusById, updateBus, removeBus };
