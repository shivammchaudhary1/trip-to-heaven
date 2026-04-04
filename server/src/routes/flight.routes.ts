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
import { roleMiddleware,authMiddleware } from "../middlewares/auth.middleware.js";

flightRouter.get("/getAll", getAllFlights);
flightRouter.get("/getById/:flightId", getFlightById);
flightRouter.get("/search", searchFlights);

flightRouter.post("/add",authMiddleware,roleMiddleware(["admin", "superadmin"]), addFlight);
flightRouter.delete("/remove/:flightId",authMiddleware,roleMiddleware(["admin", "superadmin"]), removeFlight);
flightRouter.put("/update/:flightId",authMiddleware,roleMiddleware(["admin", "superadmin"]), updateFlight);



export default flightRouter;
