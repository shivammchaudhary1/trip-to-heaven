import "./Admin.Module.css";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addFlight } from "../../Redux/AdminFlights/action";
import styled from "styled-components";
import { Link } from "react-router-dom";

let initialState = {
  airline: "",
  number: "",
  from: "",
  to: "",
  departure: "",
  arrival: "",
  price: "",
  totalTime: "",
};
export const Admin = () => {
  const [flight, setFlight] = useState(initialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFlight((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(flight);
    dispatch(addFlight(flight));
    setFlight(initialState);
  };
  return (
    <>
      <div className="adminFlightMai">
        <div className="adminSideBr">
          <Link to={"/admin"}>Home</Link>
          <Link to={"/admin/adminflight"}>Add Flight</Link>
          <Link to={"/admin/adminhotel"}>Add Hotel</Link>
          <Link to={"/admin/products"}>All Flights</Link>
          <Link to={"/admin/hotels"}>All Hotels</Link>
        </div>
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>Admin Panel for Flights</h2>
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Airline</label>
                <input
                  type="text"
                  id="input"
                  name="airline"
                  value={flight.airline}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Flight Number</label>
                <input
                  id="input"
                  type="text"
                  name="number"
                  value={flight.number}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">From</label>
                <input
                  id="input"
                  type="text"
                  name="from"
                  value={flight.from}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">To</label>
                <input
                  id="input"
                  type="text"
                  name="to"
                  value={flight.to}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Departure</label>
                <input
                  id="input"
                  type="text"
                  name="departure"
                  value={flight.departure}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Arrival</label>
                <input
                  id="input"
                  type="text"
                  name="arrival"
                  value={flight.arrival}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price</label>
                <input
                  id="input"
                  type="number"
                  name="price"
                  value={flight.price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">TotalTime</label>
                <input
                  id="input"
                  type="text"
                  name="totalTime"
                  value={flight.totalTime}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <span></span>
                <button>Add Flight Info</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

    // <div className="flightBody">
    //   {/* <div id="link">
    //     <Link to={"/"}>Home</Link>
    //     <Link to={"/adminflight"}>Admin Flight</Link>
    //     <Link to={"/adminhotel"}>Admin Hotel</Link>
    //   </div>
    //   <div>
    //     <Wrapper>
    //       <form
    //         onSubmit={(e) => {
    //           handleSubmit(e);
    //         }}
    //       >
    //         <FormControl>
    //           <Heading id="head">Admin Panel for Flights</Heading>
    //           <Box className="Box">
    //             <FormLabel id="label">Airline</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="airline"
    //               value={flight.airline}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">Flight Number</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="number"
    //               value={flight.number}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">From</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="from"
    //               value={flight.from}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">To</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="to"
    //               value={flight.to}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">Departure</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="departure"
    //               value={flight.departure}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">Arrival</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="arrival"
    //               value={flight.arrival}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">Price</FormLabel>
    //             <Input
    //               id="input"
    //               type="number"
    //               name="price"
    //               value={flight.price}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">TotalTime</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="totalTime"
    //               value={flight.totalTime}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <Button id="btn" variant="outline" type="submit">
    //               Add Flight Info
    //             </Button>
    //           </Box>
    //         </FormControl>
    //       </form>
    //     </Wrapper>
    //   </div> */}
    // </div>
  );
};
