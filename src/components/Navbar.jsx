// import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import Hotel from "../Pages/Hotel/Hotel";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logout_user } from "../Redux/Authantication/auth.action";

export const Navbar = () => {
  const dispatch = useDispatch()
  const {isAuth, activeUser, isLoading} = useSelector((store) => {
    // console.log(store)
    return {
      isAuth: store.LoginReducer.isAuth,
      activeUser: store.LoginReducer.activeUser,
      isLoading: store.LoginReducer.isLoading
    }
  },shallowEqual) 

  $(document).on("click", ".iconCard", function () {
    $(".icons >.iconCard").removeClass("active");
    $(this).addClass("active");
  });


  $(document).on('click','#activePopup',function(){
    $(this).toggleClass("active");
  })

  const handleLogout = () => {
    dispatch(logout_user)
  }

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="https://i.ibb.co/FqKTWS4/tth3.png" alt="not visible" />
        </Link>
      </div>
      <div className="icons">
        <Link to="/flight" className="iconCard">
          <i className="fa fa-plane"></i>
          <h1>Flight</h1>
        </Link>
        <Link to="/hotel" className="iconCard">
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
        {!isAuth ? 
            <Link to="/login">
            <div className="ball"></div>
            Login or <br /> Create Account
          </Link>
        :
          <Link id="activePopup">
            <div className="ball">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            </div>
            {activeUser.user_name}
            <div className="navbarPopup">
              <Link to="/profile">Profile</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </div>
          </Link>
        }
        <select>
          <option value="">Select Country</option>
          <option value="india">India</option>
          <option value="bangladesh">Bangaladesh</option>
          <option value="U.K">U.K</option>
          <option value="Brazil">Brazil</option>
          <option value="Cheen">Cheen</option>
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
