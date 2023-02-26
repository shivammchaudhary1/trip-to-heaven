import React from 'react'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import './Booking.Module.css'
import { BookingDetails } from './bookingDetails'
import { Cart } from './Cart'


export const Booking = () => {
  return (
    <>
     <Navbar/>
    <div className="booking">
     
       
        <h1>
            Complete your Booking Process ...
        </h1>

<div>
  
<Cart/>
<BookingDetails/>

</div>





    </div>
    <Footer/>
    </>
  )
}