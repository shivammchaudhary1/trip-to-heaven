import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import "../styles/homePage.css"
import { Offers } from '../Components/Offers';
import { HomeSliders } from '../Components/HomeSliders';
import $ from 'jquery';
import { Footer } from '../Components/Footer';

export const HomePage = () => {

  const swapValuehandler = () => {
    let from = document.getElementById("from");
    let to = document.getElementById("fromTo");
    let temp1 = from.value;
    let temp2 = to.value;
    // console.log(from,to)
    from.value = temp2
    to.value= temp1
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
            <div className="homeInputBx">
              <div>
                <div className="homeInputs">
                  <input name="type" type="text" type="radio" id='inputs' />
                  <label for='inputs'>ONE WAY</label>
                </div>
                <div className="homeInputs">
                  <input name="type" type="text" type="radio" id='inputs2' />
                  <label for='inputs2'>ROUND TRIP</label>
                </div>
                <div className="homeInputs">
                  <input name="type" type="text" type="radio" id='inputs3' />
                  <label for='inputs3'>MULTI CITY</label>
                </div>
              </div>
              <p>Book International and Domestic Flights</p>
            </div>
            {/*  */}
            <div className="homeMainSearchInput">
              <div className="MainSearchinputBx">
                <span>FROM</span>
                <input id='from' type="text" value="Delhi" />
                <button onClick={swapValuehandler}><i className="fa fa-exchange"></i></button>
              </div>
              <div className="MainSearchinputBx">
                <span>TO</span>
                <input id='fromTo' type="text" value="Bangaluru" />
              </div>
              <div className="MainSearchinputBx">
                <span>DEPARTURE</span>
                <input type="date" />
              </div>
              <div className="MainSearchinputBx">
                <span>RETURN</span>
                <input type="date" />
              </div>
              <div className="MainSearchinputBx">
                <span>TRAVELLERS & CLASS</span>
                <input type="number" value={"1"} />
              </div>
            </div>
            {/*  */}
            <div className="Homeoptions">
              <h3>Select A <br /> Fare Type: </h3>
              <div className="optionsInputBx">
                <input type="radio" name='fares' />
                <p>Regular Fares</p>
              </div>
              <div className="optionsInputBx">
                <input type="radio" name='fares' />
                <p>Armed Forces Fares</p>
              </div>
              <div className="optionsInputBx">
                <input type="radio" name='fares' />
                <p>Student Fares</p>
              </div>
              <div className="optionsInputBx">
                <input type="radio" name='fares' />
                <p>Seniour Citizen Fares</p>
              </div>
              <div className="optionsInputBx">
                <input type="radio" name='fares' />
                <p>Doctor & Nurse Fares</p>
              </div>
              <div className="optionsInputBx">
                <input disabled type="radio" name='fares' />
                <p>Double Seat fares</p>
              </div>
            </div>
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
