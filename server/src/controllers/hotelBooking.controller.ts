import { Request, Response } from "express";
import HotelBooking from "../models/hotelBooking.model.js";
import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import { IHotelBooking } from "../interface/booking.types.js";

// ==================== CREATE ====================

/**
 * Create a new hotel booking
 * @route POST /api/hotel-bookings
 * @param {Request} req - Request object with booking details
 * @param {Response} res - Response object
 */
export const createHotelBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { hotel, user, checkInDate, checkOutDate, numberOfNights } = req.body;

    // Validate hotel exists
    const hotelExists = await Hotel.findById(hotel);
    if (!hotelExists) {
      res.status(404).json({ success: false, message: "Hotel not found" });
      return;
    }

    // Validate user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Generate unique confirmation code
    const confirmationCode = `HB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newBooking = new HotelBooking({
      ...req.body,
      confirmationCode,
      bookingStatus: "pending",
      paymentStatus: "pending",
    });

    const savedBooking = await newBooking.save();
    const populatedBooking = await HotelBooking.findById(savedBooking._id)
      .populate("hotel", "propertyName images location pricing")
      .populate("user", "name email mobileNumber");

    res.status(201).json({
      success: true,
      message: "Hotel booking created successfully",
      data: populatedBooking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating hotel booking",
    });
  }
};

// ==================== READ ====================

/**
 * Get all hotel bookings with pagination and filters
 * @route GET /api/hotel-bookings
 * @param {Request} req - Query parameters for filtering and pagination
 * @param {Response} res - Response object
 */
export const getAllHotelBookings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      paymentStatus,
      userId,
      hotelId,
      search,
    } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const filter: any = {};

    if (status) filter.bookingStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (userId) filter.user = userId;
    if (hotelId) filter.hotel = hotelId;

    if (search) {
      filter.$or = [
        { guestName: { $regex: search, $options: "i" } },
        { guestEmail: { $regex: search, $options: "i" } },
        { confirmationCode: { $regex: search, $options: "i" } },
      ];
    }

    const bookings = await HotelBooking.find(filter)
      .populate("hotel", "propertyName images location")
      .populate("user", "name email mobileNumber")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await HotelBooking.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching hotel bookings",
    });
  }
};

/**
 * Get single hotel booking by ID
 * @route GET /api/hotel-bookings/:id
 * @param {Request} req - Request with booking ID
 * @param {Response} res - Response object
 */
export const getHotelBookingById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const booking = await HotelBooking.findById(id)
      .populate("hotel")
      .populate("user");

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
      return;
    }

    const transaction = await Transaction.findOne({
      booking: id,
      bookingType: "HotelBooking",
    });

    res.status(200).json({
      success: true,
      data: {
        booking,
        transaction,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching hotel booking",
    });
  }
};

/**
 * Get all bookings by user
 * @route GET /api/hotel-bookings/user/:userId
 * @param {Request} req - Request with user ID
 * @param {Response} res - Response object
 */
export const getBookingsByUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const bookings = await HotelBooking.find({ user: userId })
      .populate("hotel", "propertyName images location")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await HotelBooking.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching user bookings",
    });
  }
};

/**
 * Get all bookings for a hotel
 * @route GET /api/hotel-bookings/hotel/:hotelId
 * @param {Request} req - Request with hotel ID
 * @param {Response} res - Response object
 */
export const getBookingsByHotel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { hotelId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const bookings = await HotelBooking.find({ hotel: hotelId })
      .populate("user", "name email mobileNumber")
      .sort({ checkInDate: 1 })
      .skip(skip)
      .limit(limitNum);

    const total = await HotelBooking.countDocuments({ hotel: hotelId });

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching hotel bookings",
    });
  }
};

// ==================== UPDATE ====================

/**
 * Update hotel booking
 * @route PUT /api/hotel-bookings/:id
 * @param {Request} req - Request with updated booking data
 * @param {Response} res - Response object
 */
export const updateHotelBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { hotel, user, confirmationCode, ...updateData } = req.body;

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    )
      .populate("hotel")
      .populate("user");

    if (!updatedBooking) {
      res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Hotel booking updated successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating hotel booking",
    });
  }
};

/**
 * Update booking status
 * @route PUT /api/hotel-bookings/:id/status
 * @param {Request} req - Request with new status
 * @param {Response} res - Response object
 */
export const updateBookingStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { bookingStatus, notes } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "checked_in",
      "checked_out",
      "cancelled",
      "no_show",
    ];

    if (!validStatuses.includes(bookingStatus)) {
      res.status(400).json({
        success: false,
        message: `Invalid booking status. Must be one of: ${validStatuses.join(", ")}`,
      });
      return;
    }

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      { bookingStatus, notes },
      { new: true },
    );

    if (!updatedBooking) {
      res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating booking status",
    });
  }
};

/**
 * Update payment status
 * @route PUT /api/hotel-bookings/:id/payment-status
 * @param {Request} req - Request with new payment status
 * @param {Response} res - Response object
 */
export const updatePaymentStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { paymentStatus, transactionId, paymentMethod } = req.body;

    const validPaymentStatuses = ["pending", "completed", "failed", "refunded"];

    if (!validPaymentStatuses.includes(paymentStatus)) {
      res.status(400).json({
        success: false,
        message: `Invalid payment status. Must be one of: ${validPaymentStatuses.join(", ")}`,
      });
      return;
    }

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      { paymentStatus, transactionId, paymentMethod },
      { new: true },
    );

    if (!updatedBooking) {
      res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating payment status",
    });
  }
};

/**
 * Cancel booking with refund
 * @route PUT /api/hotel-bookings/:id/cancel
 * @param {Request} req - Request with cancellation reason
 * @param {Response} res - Response object
 */
export const cancelBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { cancellationReason } = req.body;

    const booking = await HotelBooking.findById(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
      return;
    }

    if (booking.bookingStatus === "cancelled") {
      res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
      return;
    }

    // Calculate refund based on cancellation policy
    let refundAmount = booking.pricing.totalPrice;

    // Example: 50% refund if cancelled more than 7 days before check-in
    const daysUntilCheckIn = Math.floor(
      (new Date(booking.checkInDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysUntilCheckIn < 7) {
      refundAmount = booking.pricing.totalPrice * 0.5; // 50% refund
    }

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      {
        bookingStatus: "cancelled",
        paymentStatus: "refunded",
        cancellationReason,
        cancellationRequestedAt: new Date(),
        cancellationApprovedAt: new Date(),
        refundAmount,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: updatedBooking,
      refund: {
        amount: refundAmount,
        reason:
          daysUntilCheckIn < 7
            ? "50% refund - Less than 7 days to check-in"
            : "100% refund - More than 7 days to check-in",
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error cancelling booking",
    });
  }
};

// ==================== DELETE ====================

/**
 * Delete hotel booking (soft delete via status)
 * @route DELETE /api/hotel-bookings/:id
 * @param {Request} req - Request with booking ID
 * @param {Response} res - Response object
 */
export const deleteHotelBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedBooking = await HotelBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Hotel booking deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting hotel booking",
    });
  }
};

// ==================== ANALYTICS & STATISTICS ====================

/**
 * Get monthly booking statistics
 * @route GET /api/hotel-bookings/stats/monthly
 * @param {Request} req - Request with optional date range
 * @param {Response} res - Response object
 */
export const getMonthlyBookingStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { year = new Date().getFullYear(), month } = req.query;

    const startDate = month
      ? new Date(parseInt(year as string), parseInt(month as string) - 1, 1)
      : new Date(parseInt(year as string), 0, 1);

    const endDate = month
      ? new Date(parseInt(year as string), parseInt(month as string), 0)
      : new Date(parseInt(year as string), 11, 31);

    const stats = await HotelBooking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$pricing.totalPrice" },
          totalTaxes: { $sum: "$pricing.taxes" },
          totalDiscounts: { $sum: "$pricing.discountAmount" },
          completedBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "checked_out"] }, 1, 0],
            },
          },
          cancelledBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "cancelled"] }, 1, 0],
            },
          },
          pendingBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "pending"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching monthly statistics",
    });
  }
};

/**
 * Get booking status distribution
 * @route GET /api/hotel-bookings/stats/status-distribution
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export const getStatusDistribution = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const distribution = await HotelBooking.aggregate([
      {
        $group: {
          _id: "$bookingStatus",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$pricing.totalPrice" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching status distribution",
    });
  }
};

/**
 * Get hotel occupancy rate
 * @route GET /api/hotel-bookings/stats/occupancy/:hotelId
 * @param {Request} req - Request with hotel ID
 * @param {Response} res - Response object
 */
export const getHotelOccupancyRate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { hotelId } = req.params;
    const {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    } = req.query;

    const startDate = new Date(
      parseInt(year as string),
      parseInt(month as string) - 1,
      1,
    );
    const endDate = new Date(
      parseInt(year as string),
      parseInt(month as string),
      0,
    );

    const daysInMonth = endDate.getDate();

    const bookings = await HotelBooking.find({
      hotel: hotelId,
      $or: [
        {
          checkInDate: { $lte: endDate },
          checkOutDate: { $gte: startDate },
        },
      ],
    });

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
      return;
    }

    let totalRoomNights = 0;
    let bookedRoomNights = 0;

    bookings.forEach((booking) => {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);

      const effectiveCheckIn = checkIn < startDate ? startDate : checkIn;
      const effectiveCheckOut = checkOut > endDate ? endDate : checkOut;

      const nights = Math.ceil(
        (effectiveCheckOut.getTime() - effectiveCheckIn.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      bookedRoomNights += nights * booking.numberOfRooms;
    });

    totalRoomNights = daysInMonth * hotel.rooms.totalRooms;

    const occupancyRate = (bookedRoomNights / totalRoomNights) * 100;

    res.status(200).json({
      success: true,
      data: {
        hotel: {
          id: hotelId,
          name: hotel.propertyName,
          totalRooms: hotel.rooms.totalRooms,
        },
        month: parseInt(month as string),
        year: parseInt(year as string),
        daysInMonth,
        totalRoomNights,
        bookedRoomNights,
        occupancyRate: occupancyRate.toFixed(2),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error calculating occupancy rate",
    });
  }
};

/**
 * Get revenue analytics
 * @route GET /api/hotel-bookings/stats/revenue
 * @param {Request} req - Request with optional date range
 * @param {Response} res - Response object
 */
export const getRevenueAnalytics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { startDate, endDate, hotelId } = req.query;

    const filter: any = {
      paymentStatus: "completed",
    };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    if (hotelId) {
      filter.hotel = hotelId;
    }

    const revenue = await HotelBooking.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$pricing.totalPrice" },
          totalTaxes: { $sum: "$pricing.taxes" },
          totalDiscounts: { $sum: { $ifNull: ["$pricing.discountAmount", 0] } },
          netRevenue: {
            $sum: {
              $subtract: [
                "$pricing.totalPrice",
                { $ifNull: ["$pricing.discountAmount", 0] },
              ],
            },
          },
          averageBookingValue: { $avg: "$pricing.totalPrice" },
          totalBookings: { $sum: 1 },
          totalGuests: { $sum: "$numberOfGuests" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: revenue[0] || {
        totalRevenue: 0,
        totalTaxes: 0,
        totalDiscounts: 0,
        netRevenue: 0,
        averageBookingValue: 0,
        totalBookings: 0,
        totalGuests: 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching revenue analytics",
    });
  }
};

/**
 * Get booking trends over time
 * @route GET /api/hotel-bookings/stats/trends
 * @param {Request} req - Request with optional parameters
 * @param {Response} res - Response object
 */
export const getBookingTrends = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days as string));

    const trends = await HotelBooking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          bookings: { $sum: 1 },
          revenue: { $sum: "$pricing.totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      period: `Last ${days} days`,
      data: trends,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching booking trends",
    });
  }
};

/**
 * Get dashboard overview
 * @route GET /api/hotel-bookings/stats/dashboard
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export const getDashboardOverview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { hotelId } = req.query;

    const filter: any = {};
    if (hotelId) filter.hotel = hotelId;

    const totalBookings = await HotelBooking.countDocuments(filter);

    const completedBookings = await HotelBooking.countDocuments({
      ...filter,
      bookingStatus: "checked_out",
    });

    const pendingBookings = await HotelBooking.countDocuments({
      ...filter,
      bookingStatus: "pending",
    });

    const cancelledBookings = await HotelBooking.countDocuments({
      ...filter,
      bookingStatus: "cancelled",
    });

    const revenueData = await HotelBooking.aggregate([
      {
        $match: {
          ...filter,
          paymentStatus: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$pricing.totalPrice" },
          averageBookingValue: { $avg: "$pricing.totalPrice" },
        },
      },
    ]);

    const thisMonthBookings = await HotelBooking.countDocuments({
      ...filter,
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalBookings,
          completedBookings,
          pendingBookings,
          cancelledBookings,
          thisMonthBookings,
        },
        revenue: revenueData[0] || {
          totalRevenue: 0,
          averageBookingValue: 0,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching dashboard overview",
    });
  }
};

//check
