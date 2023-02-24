import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin } from "./Admin/AdminFlight";
import { AdminHotel } from "./Admin/AdminHotel";
import Flights from "./Flight";
import { HomePage } from "./HomePage";
import Hotel from "./Hotel/Hotel";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/flight" element={<Flights/>}/>
        <Route path="/adminflight" element={<Admin />} />
        <Route path="/adminhotel" element={<AdminHotel />} />
      </Routes>
    </>
  );
};
