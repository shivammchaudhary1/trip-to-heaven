import React from 'react';
import './Booking.Module.css';

export const BookingDetails = () => {
  return (
    <div className='details'>
        <h1>
            Enter your details
        </h1>
        {/* <label >Name </label> */}
<input type="text" placeholder='name' />
{/* <br /> */}
<input type="number" placeholder='mobile number'  />
<br />
<input type="email" placeholder='Email' />
{/* <br /> */}
<select name="" id="">
    <option value="">Male</option>
    <option value="">Female</option>
</select>

    </div>
  )
}
