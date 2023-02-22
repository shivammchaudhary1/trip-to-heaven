import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import Hotel from "./Hotel/Hotel";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel" element={<Hotel />} />
      </Routes>
    </>
  );
};
