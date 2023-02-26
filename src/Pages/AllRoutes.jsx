import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Admin } from "./Admin/AdminFlight";
import { AdminHotel } from "./Admin/AdminHotel";
import { AdminLandingPage } from "./Admin/adminLandingPage";
import { AdminProducts } from "./Admin/AdminProducts";
import { AllHotels } from "./Admin/AllHotels";
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
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/hotel"
          element={
            <>
              <Navbar />
              <Hotel />
            </>
          }
        />
        <Route
          path="hotel/:id"
          element={
            <>
              <Navbar />
              <HotelDetails />
            </>
          }
        />
        <Route
          path="/flight"
          element={
            <>
              <Navbar />
              <Flights />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />

        <Route path="/admin/adminhotel" element={<AdminHotel />} />
        <Route path="/admin/adminflight" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/hotels" element={<AllHotels />} />
        <Route path="/admin" element={<AdminLandingPage />} />
      </Routes>
    </>
  );
};
