import React from 'react'

export const HomePageComponent2 = () => {
  return (
    <>
        <div className="homeInputBx">
            <div>
            <div className="homeInputs">
                <input checked="checked" name="type" type="radio" id='inputs' />
                <label for='inputs'>UPTO 5 ROOMS</label>
            </div>
            <div className="homeInputs">
                <input name="type" type="radio" id='inputs2' />
                <label for='inputs2'>GROUP DEAL</label>
            </div>
            </div>
            <p>Book International and Domestic Flights</p>
        </div>
        {/*  */}
        <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
            <span>CITY, PROPERTY NAME OR LOCATION</span>
            <input id='from' type="text" value="Goa" />
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
                <input type="number" value="1" style={{fontSize: "25px", fontWeight: "700", padding: "0 20px"}} />
            </div>
            <div className="MainSearchinputBx">
                <select>
                    <option value="">PRICE PER NIGHT</option>
                    <option value="">₹0-₹1500</option>
                    <option value="">₹1500-₹2500</option>
                    <option value=""> ₹2500-₹5000</option>
                    <option value=""> ₹5000+</option>
                </select>
            </div>
        </div>
        
    </>
  )
}
