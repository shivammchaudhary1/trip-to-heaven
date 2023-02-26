import axios from 'axios';
import './Booking.Module.css'
import React, { useEffect, useState } from 'react'
import { ImArrowLeft ,ImArrowRight,ImArrowDown} from "react-icons/im";
import { GiAirplane ,GiAirplaneDeparture,GiAirplaneArrival} from "react-icons/gi";

export const Cart = () => {


  const[flightcart,setFlightcart] = useState([]);
  const[hotelcart,sethotelcart] = useState([]);

  useEffect(()=>{
axios.get("  http://localhost:8000/cart").then((res)=>{
console.log(flightcart);
setFlightcart(res.data.flight);
console.log(hotelcart);
sethotelcart(res.data.hotels);


})

  },[]);



  return (
    <div className='cart'>
      {
        flightcart.length>0 && 
flightcart.map((el)=>{
return(
  <div className='flight' key={el.id}>


<div>
  
<h1> 
 {el.airline} Airline 
</h1>

<h2>
  {el.arrival} - {el.from}   
  {/* <GiAirplaneDeparture/> <ImArrowLeft/> <ImArrowRight/>  <GiAirplaneArrival/> */}
</h2>
<ImArrowDown/>
<h2>
  {el.departure} -  {el.to}
</h2>
<h3>Journey Time - {el.totalTime}</h3>
</div>



<div>
  
  <h2>
    Baggage - ADULT
  </h2>

  <h3>
    Checkin - 15kg(1 piece only)
  </h3>

  <h3>
    Cabin - 7kg(1 piece only)
  </h3>

  <button>
    Cancel the Ticket
  </button>

</div>



  </div>
)

})
        
      }
      
    </div>
  )
}
