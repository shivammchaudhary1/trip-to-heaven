import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Admin } from "./Admin/AdminFlight";
import { AdminHotel } from "./Admin/AdminHotel";
import { Cart } from "./booking/Cart";

import Flights from "./Flights/Flight";

import { HomePage } from "./HomePage";
import Hotel from "./Hotel/Hotel";
import HotelDetails from "./Hotel/HotelDetails";
import { Login } from "./Login";
import { Register } from "./Register";

export const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="hotel/:id" element={<HotelDetails />} />
        <Route path="/flight" element={<Flights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminflight" element={<Admin />} />
        <Route path="/adminhotel" element={<AdminHotel />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};
