import Transaction from "../models/transaction.model.js";
import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

function createFakeTransaction() {
  return {
    bookingType: faker.helpers.arrayElement(["hotel", "flight", "bus"]),
    amount: Number(faker.finance.amount({ min: 500, max: 50000, dec: 2 })),
    currency: faker.helpers.arrayElement(["USD", "INR", "EUR", "GBP"]),
    paymentMethod: faker.helpers.arrayElement([
      "credit_card",
      "debit_card",
      "upi",
      "net_banking",
      "wallet",
    ]),
    transactionStatus: "pending",
    paymentGateway: "manual",
    description: faker.commerce.productDescription().slice(0, 120),
    reference: `REF-${faker.string.alphanumeric(10).toUpperCase()}`,
    gatewayTransactionId: `GTX-${faker.string.alphanumeric(14).toUpperCase()}`,
    gatewayReference: `GREF-${faker.string.alphanumeric(10).toUpperCase()}`,
    notes: faker.lorem.sentence(),
    metadata: {
      source: "faker-default",
      generatedAt: new Date().toISOString(),
    },
  };
}

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const fakeDefaults = createFakeTransaction();
    const userId =
      (req as any).userId || new mongoose.Types.ObjectId().toString();

    const {
      bookingType,
      bookingId,
      hotelBookingId,
      flightBookingId,
      busBookingId,
      amount,
      currency,
      paymentMethod,
      paymentGateway,
      transactionStatus,
      refundStatus,
      refundAmount,
      refundedAt,
      notes,
      description,
      reference,
      gatewayTransactionId,
      gatewayReference,
      metadata,
      successResponse,
      failureReason,
    } = req.body;

    const resolvedBookingType =
      bookingType === "hotel" ||
      bookingType === "flight" ||
      bookingType === "bus"
        ? bookingType
        : fakeDefaults.bookingType;

    const resolvedHotelBookingId =
      resolvedBookingType === "hotel"
        ? hotelBookingId || bookingId || new mongoose.Types.ObjectId()
        : undefined;
    const resolvedFlightBookingId =
      resolvedBookingType === "flight"
        ? flightBookingId || bookingId || new mongoose.Types.ObjectId()
        : undefined;
    const resolvedBusBookingId =
      resolvedBookingType === "bus"
        ? busBookingId || bookingId || new mongoose.Types.ObjectId()
        : undefined;

    const resolvedAmount =
      Number.isFinite(Number(amount)) && Number(amount) >= 0
        ? Number(amount)
        : fakeDefaults.amount;

    const resolvedCurrency =
      currency && ["USD", "INR", "EUR", "GBP"].includes(currency)
        ? currency
        : fakeDefaults.currency;

    const resolvedPaymentMethod =
      paymentMethod &&
      ["credit_card", "debit_card", "upi", "net_banking", "wallet"].includes(
        paymentMethod,
      )
        ? paymentMethod
        : fakeDefaults.paymentMethod;

    const resolvedTransactionStatus =
      transactionStatus &&
      ["pending", "completed", "failed", "refunded", "cancelled"].includes(
        transactionStatus,
      )
        ? transactionStatus
        : fakeDefaults.transactionStatus;

    const resolvedPaymentGateway =
      paymentGateway &&
      ["stripe", "razorpay", "paypal", "manual"].includes(paymentGateway)
        ? paymentGateway
        : fakeDefaults.paymentGateway;

    const transactionPayload = {
      userId,
      bookingType: resolvedBookingType,
      hotelBookingId: resolvedHotelBookingId,
      flightBookingId: resolvedFlightBookingId,
      busBookingId: resolvedBusBookingId,
      amount: resolvedAmount,
      currency: resolvedCurrency,
      paymentMethod: resolvedPaymentMethod,
      paymentGateway: resolvedPaymentGateway,
      transactionStatus: resolvedTransactionStatus,
      refundStatus: refundStatus || "not_refunded",
      refundAmount,
      refundedAt,
      notes: notes || fakeDefaults.notes,
      description: description || fakeDefaults.description,
      reference: reference || fakeDefaults.reference,
      gatewayTransactionId:
        gatewayTransactionId || fakeDefaults.gatewayTransactionId,
      gatewayReference: gatewayReference || fakeDefaults.gatewayReference,
      metadata: metadata || fakeDefaults.metadata,
      successResponse,
      failureReason,
    };

    const transaction = await Transaction.create(transactionPayload);

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Payment Failed, Server error", error });
  }
};
