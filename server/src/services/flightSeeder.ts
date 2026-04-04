import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Flight from "../models/flight.model.js";
import envs from "../config/environment/envs.js";

const airports = [
  {
    code: "DEL",
    name: "Indira Gandhi International",
    city: "Delhi",
    country: "India",
  },
  {
    code: "BOM",
    name: "Bombay High International",
    city: "Mumbai",
    country: "India",
  },
  {
    code: "BLR",
    name: "Kempegowda International",
    city: "Bangalore",
    country: "India",
  },
  {
    code: "HYD",
    name: "Rajiv Gandhi International",
    city: "Hyderabad",
    country: "India",
  },
  {
    code: "CCU",
    name: "Netaji Subhas Chandra Bose",
    city: "Kolkata",
    country: "India",
  },
  {
    code: "COK",
    name: "Cochin International",
    city: "Kochi",
    country: "India",
  },
  {
    code: "MAA",
    name: "Chennai International",
    city: "Chennai",
    country: "India",
  },
  {
    code: "JFK",
    name: "John F. Kennedy International",
    city: "New York",
    country: "USA",
  },
  { code: "LHR", name: "London Heathrow", city: "London", country: "UK" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  {
    code: "SIN",
    name: "Singapore Changi",
    city: "Singapore",
    country: "Singapore",
  },
  { code: "HND", name: "Haneda", city: "Tokyo", country: "Japan" },
  { code: "PEK", name: "Beijing Capital", city: "Beijing", country: "China" },
];

const airlines = [
  "Air India",
  "Indigo",
  "SpiceJet",
  "GoAir",
  "Vistara",
  "Air Asia",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "British Airways",
  "Lufthansa",
  "Air France",
];

const aircraftTypes = [
  "Boeing 737",
  "Boeing 747",
  "Boeing 777",
  "Airbus A320",
  "Airbus A380",
  "Bombardier",
  "Embraer",
];

const operatorIds = [
  "69bd52d7e85d958fb206cffa",
  "69bd52fde85d958fb206cffd",
  "69bd5bb0ffb5b5dc7185a121",
  "69bd5bb4ffb5b5dc7185a124",
  "69bd5b8bffb5b5dc7185a11e",
];

const flightStatuses = ["scheduled", "delayed", "completed"];

export const generateFakeFlights = (count: number = 100) => {
  const flights = [];

  for (let i = 0; i < count; i++) {
    const departureAirport = faker.helpers.arrayElement(airports);
    let arrivalAirport = faker.helpers.arrayElement(airports);

    // Ensure departure and arrival airports are different
    while (arrivalAirport.code === departureAirport.code) {
      arrivalAirport = faker.helpers.arrayElement(airports);
    }

    const departureTime = faker.date.soon({ days: 30 });
    const duration = faker.number.int({ min: 60, max: 900 }); // 1 minute to 15 hours
    const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

    const totalSeats = faker.helpers.arrayElement([
      150, 180, 200, 250, 300, 350,
    ]);
    const availableSeats = faker.number.int({ min: 10, max: totalSeats });

    const basePrice = faker.number.int({ min: 3000, max: 50000 });
    const discountPercentage = faker.number.int({ min: 0, max: 40 });
    const discountAmount = (basePrice * discountPercentage) / 100;
    const discountPrice = basePrice - discountAmount;
    const taxes = Math.round(basePrice * 0.12); // 12% tax
    const totalPrice = discountPrice + taxes;

    const airline_code = faker.helpers.arrayElement([
      "AI",
      "6E",
      "SG",
      "I5",
      "UK",
      "9W",
      "EK",
      "QR",
    ]);
    const flight_num = `${String(1000 + i).slice(-4)}`;
    const flightNumber = `${airline_code}${flight_num}`;

    const flight = {
      flightNumber,
      airlineName: faker.helpers.arrayElement(airlines),
      aircraftType: faker.helpers.arrayElement(aircraftTypes),
      departureAirport: {
        code: departureAirport.code,
        name: departureAirport.name,
        city: departureAirport.city,
        country: departureAirport.country,
      },
      arrivalAirport: {
        code: arrivalAirport.code,
        name: arrivalAirport.name,
        city: arrivalAirport.city,
        country: arrivalAirport.country,
      },
      departureTime,
      arrivalTime,
      duration,
      distance: faker.number.int({ min: 500, max: 10000 }),
      route: {
        stops: faker.number.int({ min: 0, max: 2 }),
        stopoverAirports: [],
      },
      seats: {
        totalSeats,
        availableSeats,
        seatClasses: [
          {
            class: "economy",
            totalSeats: Math.round(totalSeats * 0.7),
            availableSeats: faker.number.int({
              min: 5,
              max: Math.round(totalSeats * 0.7),
            }),
            price: basePrice,
          },
          {
            class: "business",
            totalSeats: Math.round(totalSeats * 0.2),
            availableSeats: faker.number.int({
              min: 2,
              max: Math.round(totalSeats * 0.2),
            }),
            price: Math.round(basePrice * 2.5),
          },
          {
            class: "first",
            totalSeats: Math.round(totalSeats * 0.1),
            availableSeats: faker.number.int({
              min: 0,
              max: Math.round(totalSeats * 0.1),
            }),
            price: Math.round(basePrice * 4),
          },
        ],
      },
      pricing: {
        basePrice,
        currency: "INR",
        discountPercentage,
        discountPrice,
        taxes,
        totalPrice,
      },
      amenities: {
        mealService: faker.datatype.boolean(),
        wifi: faker.datatype.boolean(),
        audioVisualEntertainment: faker.datatype.boolean({ probability: 0.8 }),
        powerOutlets: faker.datatype.boolean({ probability: 0.3 }),
        blanketPillow: faker.datatype.boolean({ probability: 0.7 }),
        wheelchairAccessible: true,
        carryOnAllowance: faker.number.int({ min: 5, max: 10 }),
        checkedBaggageAllowance: faker.number.int({ min: 15, max: 30 }),
      },
      rating: {
        averageRating: faker.number.float({ min: 2, max: 5, multipleOf: 0.1 }),
        totalReviews: faker.number.int({ min: 10, max: 500 }),
        comfort: faker.number.float({ min: 2, max: 5, multipleOf: 0.1 }),
        service: faker.number.float({ min: 2, max: 5, multipleOf: 0.1 }),
        cleanliness: faker.number.float({ min: 2, max: 5, multipleOf: 0.1 }),
        timelinessOfDeparture: faker.number.float({
          min: 2,
          max: 5,
          multipleOf: 0.1,
        }),
        valueForMoney: faker.number.float({ min: 2, max: 5, multipleOf: 0.1 }),
      },
      operatingDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      operatingDate: departureTime,
      flightStatus: faker.helpers.arrayElement(flightStatuses),
      policies: {
        cancellationPolicy: faker.helpers.arrayElement([
          "Free cancellation up to 24 hours before departure",
          "Free cancellation up to 48 hours before departure",
          "Non-refundable after booking",
        ]),
        refundable: faker.datatype.boolean({ probability: 0.7 }),
        changeAllowed: faker.datatype.boolean({ probability: 0.8 }),
      },
      operator: faker.helpers.arrayElement(operatorIds),
      isActive: true,
      isVerified: faker.datatype.boolean({ probability: 0.7 }),
    };

    flights.push(flight);
  }

  return flights;
};

export const seedFlightsToDatabase = async () => {
  try {
    const mongoUri = envs.mongoUri;

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    // Clear existing flights
    console.log("🗑️  Clearing existing flights...");
    await Flight.deleteMany({});
    console.log("✓ Cleared existing flights");

    // Generate 100 flights
    console.log("🚀 Generating 100 flights...");
    const flightsData = generateFakeFlights(100);

    // Insert flights into database
    console.log("💾 Inserting flights into database...");
    const result = await Flight.insertMany(flightsData, { ordered: false });
    console.log(
      `✓ Successfully seeded ${result.length} flights into the database`,
    );

    // Verify count
    const count = await Flight.countDocuments();
    console.log(`📊 Total flights in database: ${count}`);

    // Display sample flights
    console.log("\n📋 Sample flights:");
    const sampleFlights = await Flight.find().limit(3);
    sampleFlights.forEach((flight, index) => {
      console.log(
        `${index + 1}. ${flight.flightNumber} - ${flight.airlineName}`,
      );
      console.log(
        `   ${flight.departureAirport.code} → ${flight.arrivalAirport.code}`,
      );
      console.log(`   Price: ₹${flight.pricing.totalPrice}`);
    });

    console.log("\n✨ Seeding completed successfully!");

    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding flights:", error.message);
    process.exit(1);
  }
};

// Run seeder if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedFlightsToDatabase();
}
