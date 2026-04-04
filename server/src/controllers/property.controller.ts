import Hotel from "../models/hotel.model.js";
import { Request, Response } from "express";

const addProperty = async (req: Request, res: Response) => {
  try {
    const {
      propertyName,
      description,
      propertyType,
      images,
      location,
      pricing,
      amenities,
      policies,
      rooms,
      contact,
      owner: bodyOwner,
    } = req.body;
    // Use owner from body or userId from JWT middleware
    const userId = req.userId || bodyOwner;

    // Validate owner/userId
    if (!userId) {
      return res.status(401).json({
        message:
          "Owner ID is required. Please provide owner in request body or authenticate with token.",
        success: false,
      });
    }

    // Validate required fields
    const requiredFields = {
      propertyName: "Property name",
      description: "Description",
      location: "Location",
      pricing: "Pricing",
      rooms: "Rooms",
      contact: "Contact information",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `${label} is required`,
          success: false,
        });
      }
    }

    // Validate location required fields
    if (
      !location.country ||
      !location.state ||
      !location.city ||
      !location.address
    ) {
      return res.status(400).json({
        message: "Location must include country, state, city, and address",
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

    // Validate rooms required fields
    if (!rooms.totalRooms || rooms.availableRooms === undefined) {
      return res.status(400).json({
        message: "Total rooms and available rooms are required",
        success: false,
      });
    }

    // Validate contact required fields
    if (!contact.phone) {
      return res.status(400).json({
        message: "Phone number is required",
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

    // Check if property with same name already exists for this owner
    const existingProperty = await Hotel.findOne({
      propertyName: { $regex: `^${propertyName}$`, $options: "i" },
      owner: userId,
    });

    if (existingProperty) {
      return res.status(409).json({
        message: "Property with this name already exists",
        success: false,
      });
    }

    // Create new property with proper structure
    const newProperty = new Hotel({
      propertyName: propertyName.trim(),
      description: description.trim(),
      propertyType: propertyType || "hotel",
      images: Array.isArray(images) ? images : [],
      location: {
        country: location.country.trim(),
        state: location.state.trim(),
        city: location.city.trim(),
        area: location.area?.trim() || "",
        address: location.address.trim(),
        zipCode: location.zipCode?.trim() || "",
      },
      rating: {
        averageRating: 0,
        totalReviews: 0,
        cleanliness: 0,
        comfort: 0,
        service: 0,
        location: 0,
        facilities: 0,
        staff: 0,
        valueForMoney: 0,
      },
      pricing: {
        basePrice,
        currency: pricing.currency || "USD",
        discountPercentage,
        discountPrice,
        taxes,
        totalPrice,
      },
      amenities: amenities || {},
      policies: {
        checkInTime: policies?.checkInTime || "14:00",
        checkOutTime: policies?.checkOutTime || "11:00",
        cancellationPolicy: policies?.cancellationPolicy || "moderate",
        minStay: policies?.minStay || 1,
        maxStay: policies?.maxStay || null,
      },
      rooms: {
        totalRooms: rooms.totalRooms,
        availableRooms: rooms.availableRooms,
        roomTypes: Array.isArray(rooms.roomTypes) ? rooms.roomTypes : [],
      },
      contact: {
        phone: contact.phone.trim(),
        email: contact.email?.toLowerCase().trim() || "",
        website: contact.website?.trim() || "",
      },
      owner: userId,
      isActive: true,
      isVerified: false,
    });

    await newProperty.save();

    return res.status(201).json({
      message: "Property added successfully",
      success: true,
      data: newProperty,
    });
  } catch (error: any) {
    console.error("Add property error:", error);

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

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const removeProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const userId = req.userId;

    // Validate propertyId format
    if (!propertyId) {
      return res.status(400).json({
        message: "Invalid property ID",
        success: false,
      });
    }

    // Find and verify ownership
    const property = await Hotel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    if (property.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this property",
        success: false,
      });
    }

    // Delete property
    // await Hotel.findByIdAndDelete(propertyId);
    property.isActive = false;
    await property.save();

    return res.status(200).json({
      message: "Property deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Remove property error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    // Validate propertyId format
    if (!propertyId || propertyId.length !== 24) {
      return res.status(400).json({
        message: "Invalid property ID",
        success: false,
      });
    }

    // Find and verify ownership
    const property = await Hotel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    if (property.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to update this property",
        success: false,
      });
    }

    // Fields that should not be updated
    const restricedFields = ["owner", "isVerified", "createdAt"];
    restricedFields.forEach((field) => {
      delete updateData[field];
    });

    // Update property
    const updatedProperty = await Hotel.findByIdAndUpdate(
      propertyId,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedProperty) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Property updated successfully",
      success: true,
      data: updatedProperty,
    });
  } catch (error: any) {
    console.error("Update property error:", error);

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

const getAllProperties = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      propertyType,
      minPrice,
      maxPrice,
    } = req.query;

    // Build filter query
    const filter: any = { isActive: true };

    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    if (propertyType) {
      filter.propertyType = propertyType;
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

    // Fetch properties
    const properties = await Hotel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("owner", "name email profilePicture");

    // Get total count
    const totalCount = await Hotel.countDocuments(filter);

    return res.status(200).json({
      message: "Properties fetched successfully",
      success: true,
      data: properties,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        pages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    console.error("Get all properties error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId format
    if (!propertyId || propertyId.length !== 24) {
      return res.status(400).json({
        message: "Invalid property ID",
        success: false,
      });
    }

    // Fetch property
    const property = await Hotel.findById(propertyId).populate(
      "owner",
      "name email profilePicture contact.phone",
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    if (!property.isActive) {
      return res.status(404).json({
        message: "Property is no longer available",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Property fetched successfully",
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Get property by ID error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export {
  addProperty,
  removeProperty,
  updateProperty,
  getAllProperties,
  getPropertyById,
};
