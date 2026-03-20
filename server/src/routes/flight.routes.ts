import express from "express";
const flightRouter = express.Router();
import {
  addFlight,
  removeFlight,
  updateFlight,
  getAllFlights,
  getFlightById,
  searchFlights,
} from "../controllers/flight.controller.js";

flightRouter.post("/add", addFlight);
flightRouter.delete("/remove/:flightId", removeFlight);
flightRouter.put("/update/:flightId", updateFlight);
flightRouter.get("/getAll", getAllFlights);
flightRouter.get("/getById/:flightId", getFlightById);
flightRouter.get("/search", searchFlights);

export default flightRouter;
