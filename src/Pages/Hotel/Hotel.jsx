// import axios from "axios";
import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";

import HotelSubNavbar from "./HotelSubNavbar";

const Hotel = () => {

  
  
  const getData = async () => {
    // axios.get('http://localhost:8000/hotel').then((res)=> {
    //   console.log(res.data)
    //   res.data.map((ele,i) => {
    //     res.data[i].id = i +1
    //   })
    //   console.log(res.data)
    // })

    let res = await fetch('http://localhost:8080/hotel')
    let json = await res.json()
    console.log(json)
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
