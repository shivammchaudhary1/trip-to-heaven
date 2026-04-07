import mongoose from "mongoose";
import { Request, Response } from "express";
import Bus from "../models/bus.model.js";
import BusBooking from "../models/busBooking.model.js";

const createBusBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const {
      busId,
      passengerName,
      passengerEmail,
      passengerPhone,
      numberOfSeats,
      travelDate,
    } = req.body;

    console.log("Received bus booking request:", {
      userId,
      busId,
      passengerName,
      passengerEmail,
      passengerPhone,
      numberOfSeats,
      travelDate,
    });

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!busId || !mongoose.Types.ObjectId.isValid(busId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid bus ID" });
    }

    if (!passengerName || !passengerEmail || !passengerPhone) {
      return res.status(400).json({
        success: false,
        message: "Passenger name, email, and phone are required",
      });
    }

    const seatCount = Number(numberOfSeats);
    if (!Number.isFinite(seatCount) || seatCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "numberOfSeats must be a positive number",
      });
    }

    const requestedTravelDate = travelDate ? new Date(travelDate) : null;
    if (!requestedTravelDate || Number.isNaN(requestedTravelDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Valid travelDate is required",
      });
    }

    const bus = await Bus.findOneAndUpdate(
      {
        _id: busId,
        isActive: true,
        "seats.availableSeats": { $gte: seatCount },
      },
      { $inc: { "seats.availableSeats": -seatCount } },
      { returnDocument: "after" },
    );

    if (!bus) {
      const existingBus = await Bus.findById(busId).select(
        "isActive seats.availableSeats",
      );

      if (!existingBus) {
        return res.status(404).json({
          success: false,
          message: "Bus not found",
        });
      }

      if (!existingBus.isActive) {
        return res.status(400).json({
          success: false,
          message: "Bus is inactive",
        });
      }

      if (existingBus.seats.availableSeats < seatCount) {
        return res.status(400).json({
          success: false,
          message: `Insufficient seats. Available: ${existingBus.seats.availableSeats}`,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Bus not available or insufficient seats",
      });
    }

    // Calculate pricing

    // const busData = await Bus.findById(busId);

    const seatFare = Number(bus.pricing?.basePrice || bus.price || 0);
    const discountPercentage = Number(bus.pricing?.discountPercentage || 0);
    const subtotal = seatFare * seatCount;
    const discountPrice = (subtotal * discountPercentage) / 100;
    const amountAfterDiscount = subtotal - discountPrice;
    const taxes = amountAfterDiscount * 0.18;
    const finalAmount = amountAfterDiscount + taxes;

    const pricing = {
      basePrice: seatFare,
      discountPercentage,
      taxes,
      discountPrice,
      totalPrice: finalAmount,
      currency: bus.pricing?.currency || "INR",
    };

    await BusBooking.create({
      busId: busId,
      userId: userId,
      passengerName,
      passengerEmail,
      passengerPhone,
      numberOfSeats: seatCount,
      travelDate: requestedTravelDate,
      pricing,
      finalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Bus booking created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error creating bus booking" });
  }
};

export { createBusBooking };
