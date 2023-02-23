import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HotelLayout from "./HotelLayout";

const HotelSubNavbar = () => {
  // Default Data

  const [DefaultData, setDefaultData] = useState([]);

  const [searchHotel, setSearchHotel] = useState("");
  const handleHotelSearch = (e) => {
    setSearchHotel(e.target.value);
    console.log(searchHotel);
  };

  // Get Request

  const getHotelData = () => {
    axios
      .get(`http://localhost:8000/hotel`)
      .then((res) => {
        // console.log(res.data);
        setDefaultData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleSearchButton = () => {
    console.log("Hello");
  };
  useEffect(() => {
    getHotelData();
  }, []);

  return (
    <div>
      <div className="homeTop">
        <div className="homeTopCard">
          <div className="secondHeader">
            <Link to="" className="iconCard active">
              <i className="fa fa-plane"></i>
              <h1>Flight</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-hotel"></i>
              <h1>Hotel</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-home"></i>
              <h1>Home Style</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-train"></i>
              <h1>Train</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-bus"></i>
              <h1>Bus</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-car"></i>
              <h1>Car</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-money"></i>
              <h1>Forex</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-plane"></i>
              <h1>Charter Plane</h1>
            </Link>
          </div>

          {/* Sub Navbar for Hotels Start */}

          <div className="homeInputBx">
            <div>
              <div className="homeInputs">
                <input checked="checked" name="type" type="radio" id="inputs" />
                <label for="inputs">UPTO 5 ROOMS</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs2" />
                <label for="inputs2">GROUP DEAL</label>
              </div>
            </div>
            <p>Book International and Domestic Flights</p>
          </div>
          {/*  */}
          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>CITY, PROPERTY NAME OR LOCATION</span>
              <input
                id="from"
                type="text"
                value={searchHotel}
                placeholder="Search Hotel"
                onChange={handleHotelSearch}
              />
            </div>
            <div className="MainSearchinputBx">
              <span>CHECK-IN</span>
              <input type="date" />
            </div>
            <div className="MainSearchinputBx">
              <span>CHECK-OUT</span>
              <input type="date" />
            </div>
            <div className="MainSearchinputBx">
              <span>ROOMS & GUESTS</span>
              <input
                type="number"
                placeholder="Person"
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  padding: "0 20px",
                }}
              />
            </div>
          </div>
          {/* Sub Navbar for Hotels Ends  */}
          <div className="homeSearchButtonBx">
            <button onClick={HandleSearchButton}>Search</button>
          </div>
        </div>
        <div className="homeExplore">
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png"
              alt=""
            />
            <p>Where2Go</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png"
              alt=""
            />
            <p>TripMoney</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png"
              alt=""
            />
            <p>Explore Enternational Flights</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png"
              alt=""
            />
            <p>MICE</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png"
              alt=""
            />
            <p>Gift Cards</p>
          </div>
        </div>
      </div>
      <HotelLayout DefaultData={DefaultData} />
    </div>
  );
};

export default HotelSubNavbar;
