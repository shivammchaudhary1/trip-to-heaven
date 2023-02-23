import React from "react";
import { Navbar } from "../../Components/Navbar";
import HotelSubNavbar from "./HotelSubNavbar";

const Hotel = () => {
  return (
    <div>
      {/* use Navber Here Start */}
      <Navbar />
      {/* use Navber Here End */}

      <HotelSubNavbar />
    </div>
  );
};

export default Hotel;
