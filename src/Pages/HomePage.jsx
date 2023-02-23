import React, { useEffect, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import "../styles/homePage.css"
import { Offers } from '../Components/Offers';
import { HomeSliders } from '../Components/HomeSliders';
import $ from 'jquery';
import { Footer } from '../Components/Footer';
import axios from 'axios';
import { cookieStorageManager } from '@chakra-ui/react';
import { HomePageComponent } from '../Components/homePageComponent';
import { HomePageComponent2 } from '../Components/homePageComponent2';

export const HomePage = () => {

  const [whatToShow, setWhatToshow] = useState("flight")

  const  handleFlight = () => {
    setWhatToshow("flight")
  }
  const  handleHotel = () => {
    setWhatToshow("hotel")
  }

  $(document).on('click','.iconCard',function(){
    $('.secondHeader > .iconCard').removeClass('active')
    $(this).addClass("active")
  })
  
  return (
    <>
        <Navbar />
        <div className="homeTop">
          <div className="homeTopCard">
            <div className="secondHeader">
              <Link to="" className="iconCard active" onClick={handleFlight}>
                <i className="fa fa-plane"></i>
                <h1>Flight</h1>
              </Link>
              <Link to="" className="iconCard" onClick={handleHotel}>
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
            </div>
            {/*  */}
              {whatToShow == "flight" ? <HomePageComponent /> : <HomePageComponent2 />}
              
            {/*  */}
            <div className="homeSearchButtonBx">
              <button>Search</button>
            </div>
          </div>

            {/*  */}
            <div className="homeExplore">
              <div className="exploreCard">
                <img src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png" alt="" />
                <p>Where2Go</p>
              </div>
              <div className="exploreCard">
                <img src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png" alt="" />
                <p>TripMoney</p>
              </div>
              <div className="exploreCard">
                <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png" alt="" />
                <p>Explore Enternational Flights</p>
              </div>
              <div className="exploreCard">
                <img src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png" alt="" />
                <p>MICE</p>
              </div>
              <div className="exploreCard">
                <img src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png" alt="" />
                <p>Gift Cards</p>
              </div>
            </div>
        </div>
        <Offers />
        <HomeSliders />
        <Footer />
    </>
  )
}
