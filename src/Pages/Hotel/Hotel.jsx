import axios from "axios";
import React, { useEffect } from "react";
import { Navbar } from "../../Components/Navbar";

import HotelSubNavbar from "./HotelSubNavbar";

const Hotel = () => {

  
  const getData = () => {
    axios.get('http://localhost:8000/hotel').then((res)=> {
      console.log(res.data)
      // res.data.map((ele,i) => {
        // res.data[i].id = i +1
      // })
    })
  }

  useEffect(() => {
    getData()
  },[])


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
