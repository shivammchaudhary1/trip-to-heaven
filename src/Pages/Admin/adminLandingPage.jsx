import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFlightProducts } from "../../Redux/AdminFlights/action";
import "../../styles/adminLanding.css";

export const AdminLandingPage = () => {
  const dispatch = useDispatch();
  const [flight, setFlight] = useState(0);
  const [hotel, setHotel] = useState(0);
  const [users, setUsers] = useState(0);
  const [giftCard, setGiftCard] = useState(0);
  const [loading, setLoading] = useState(false);

  const getHotel = () => {
    setLoading(true);
    axios
      .get("https://makemytrip-api-data.onrender.com/flight")
      .then((res) => {
        setFlight(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    //
    axios
      .get("https://makemytrip-api-data.onrender.com/hotel")
      .then((res) => {
        setHotel(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    //
    axios
      .get("https://makemytrip-api-data.onrender.com/users")
      .then((res) => {
        setUsers(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    //
    axios
      .get("https://makemytrip-api-data.onrender.com/giftcards")
      .then((res) => {
        setGiftCard(res.data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <div className="mainAdminLandingpage">
        <div className="adminSideBr">
          <Link to={"/admin"}>Home</Link>
          <Link to={"/admin/adminflight"}>Add Flight</Link>
          <Link to={"/admin/adminhotel"}>Add Hotel</Link>
          <Link to={"/admin/products"}>All Flights</Link>
          <Link to={"/admin/hotels"}>All Hotels</Link>
        </div>
        <div className="mainBox">
          <div className="mainBoxHead">
            <h1>Dashboard</h1>
          </div>
          <div className="DataBoxes">
            {/*  */}
            <div className="dataBx">
              <h1>Total Hotel</h1>
              {loading ? <h1>Loading...</h1> : <h1>{hotel}</h1>}
              <Link to="/admin/hotels">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Flights</h1>
              {loading ? <h1>Loading...</h1> : <h1>{flight}</h1>}
              <Link to="/admin/products">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Gift Cards</h1>
              {loading ? <h1>Loading...</h1> : <h1>{giftCard}</h1>}
              <Link to="/admin">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Users</h1>
              {loading ? <h1>Loading...</h1> : <h1>{users}</h1>}
              <Link to="/admin">View</Link>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
