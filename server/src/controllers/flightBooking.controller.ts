import Flight from "../models/flight.model.js";
import FlightBooking from "../models/flightBooking.model.js";
import User from "../models/user.model.js";
import { Request, Response } from "express";

const createFlightBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      flightId,
      passengerName,
      passengerEmail,
      passengerPhone,
      numberOfSeats,
      tripType,
      departureDate,
      returnDate,
    } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!flightId) {
      return res
        .status(400)
        .json({ success: false, message: "flightId is required" });
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

    const normalizedTripType =
      tripType === "roundtrip" ? "roundtrip" : "oneway";

    const parsedDepartureDate = departureDate ? new Date(departureDate) : null;
    if (!parsedDepartureDate || Number.isNaN(parsedDepartureDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Valid departureDate is required",
      });
    }

    let parsedReturnDate: Date | undefined;
    if (normalizedTripType === "roundtrip") {
      parsedReturnDate = returnDate ? new Date(returnDate) : undefined;
      if (!parsedReturnDate || Number.isNaN(parsedReturnDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Valid returnDate is required for roundtrip",
        });
      }

      if (parsedReturnDate <= parsedDepartureDate) {
        return res.status(400).json({
          success: false,
          message: "returnDate must be after departureDate",
        });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const flight = await Flight.findOneAndUpdate(
      {
        _id: flightId,
        isActive: true,
        "seats.availableSeats": { $gte: seatCount },
      },
      { $inc: { "seats.availableSeats": -seatCount } },
      { returnDocument: "after" },
    );

    if (!flight) {
      return res.status(400).json({
        success: false,
        message: "Flight not available or insufficient seats",
      });
    }

    const basePrice = Number(flight.pricing?.basePrice || 0);
    const discountPercentage = Number(flight.pricing?.discountPercentage || 0);
    const tripMultiplier = normalizedTripType === "roundtrip" ? 2 : 1;

    const subtotal = basePrice * seatCount * tripMultiplier;
    const discountPrice = (subtotal * discountPercentage) / 100;
    const amountAfterDiscount = subtotal - discountPrice;
    const taxes = amountAfterDiscount * 0.18;
    const totalPrice = amountAfterDiscount + taxes;

    const pricing = {
      basePrice,
      subtotal,
      discountPercentage,
      taxes,
      discountPrice,
      totalPrice,
      currency: flight.pricing?.currency || "INR",
    };

    const confirmationCode = `FLT-${Date.now()}`;

    const booking = await FlightBooking.create({
      flightId,
      userId,
      passengerName,
      passengerEmail,
      passengerPhone,
      numberOfSeats: seatCount,
      tripType: normalizedTripType,
      departureDate: parsedDepartureDate,
      returnDate: parsedReturnDate,
      pricing,
      finalAmount: totalPrice,
      bookingStatus: "pending",
      paymentStatus: "pending",
      confirmationCode,
    });

    return res.status(201).json({
      success: true,
      message: "Flight booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Error creating flight booking",
    });
  }
};

export { createFlightBooking };
