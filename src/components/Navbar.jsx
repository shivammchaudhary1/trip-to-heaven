// import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import Hotel from "../Pages/Hotel/Hotel";

export const Navbar = () => {
  $(document).on("click", ".iconCard", function () {
    $(".icons >.iconCard").removeClass("active");
    $(this).addClass("active");
  });

  return (
    <header>
      <div className="logo">
        <img
          src="https://i0.wp.com/nextpax.com/wp-content/uploads/2022/01/makemytrip-1.png?fit=1080%2C500&ssl=1"
          alt="not visible"
        />
      </div>
      <div className="icons">
        <Link to="/flight" className="iconCard active">
          <i className="fa fa-plane"></i>
          <h1>Flight</h1>
        </Link>
        <Link to="hotel" className="iconCard">
          <i className="fa fa-hotel"></i>
          <h1>Hotel</h1>
        </Link>
        <Link to="" className="iconCard">
          <i className="fa fa-home"></i>
          <h1>Home Style</h1>
        </Link>
        {/* <Link to="" className="iconCard">
              <i className="fa fa-balloon"></i>
              <i className="fa fa-car"></i>
              <h1>Holiday Packages</h1>
            </Link> */}
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
        {/* <Link to="" className="iconCard">
              <i className="fa-light fa-mountain-city"></i>
              <h1>Activity</h1>
            </Link> */}
      </div>

      <div className="login">
        <Link>
          <div className="ball"></div>
          Login or <br /> Create Account
        </Link>
        <select>
          <option selected>Select Country</option>
          <option>India</option>
          <option>Bangaladesh</option>
          <option>U.K</option>
          <option>Brazil</option>
          <option>Cheen</option>
        </select>
        <select>
          <option disabled>Lenguage</option>
          <option>Bangaladesh</option>
          <option>U.K</option>
          <option>Brazil</option>
          <option>Cheen</option>
        </select>
      </div>
    </header>
  );
};
