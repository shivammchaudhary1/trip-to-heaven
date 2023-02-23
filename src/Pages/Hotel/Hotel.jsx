import React from "react";
import { Navbar } from "../../Components/Navbar";

import HotelSubNavbar from "./HotelSubNavbar";

const Hotel = () => {
  return (
    <div>
      {/* use Navber Here Start */}
      <Navbar />
      {/* use Navber Here End */}
      {/* <HotelSideBar /> */}
      <HotelSubNavbar />

      {/* sidebar  */}
      {/* <HotelLayout /> */}
    </div>
  );
};

export default Hotel;
