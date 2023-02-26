import axios from 'axios';
import './Booking.Module.css'
import React, { useEffect, useState } from 'react'

import { ImArrowLeft ,ImArrowRight,ImArrowDown} from "react-icons/im";
import { GiAirplane ,GiAirplaneDeparture,GiAirplaneArrival} from "react-icons/gi";


export const Cart = () => {


  const[flightcart,setFlightcart] = useState([]);
  const[hotelcart,sethotelcart] = useState([]);
  const [payment,setPayment]=useState(0);

  useEffect(()=>{
axios.get("  http://localhost:8000/flightcart").then((res)=>{
// console.log(flightcart);
setFlightcart(res.data);
// console.log(hotelcart);
sethotelcart(res.data.hotels);




})






  },[]);


  useEffect(()=>{
    paymentloop();
  })


  const paymentloop=()=>{

    setPayment(0);
    flightcart.map((el)=>{
      setPayment((pre) =>pre+el.price)

 })
console.log(payment)
  }





  return (
    <div className='container'>

    

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


    {/* payment details */}

{payment>0 && <div className='paymentsum'>
  <h1>
    Fare summary
  </h1>

  <h3>
  Ticket price :-  <span>
 + {payment}
  </span>
  </h3>
  
 

<h3>
  fee & Taxes :- <span>
  + 1000
  </span>
</h3>

<h3>
    Discount    :- <span>

 - 500
  </span>
</h3>

<hr />

<h3>
Total Payment  :- <span>{payment+500} /-</span>
</h3>

<hr />


<button>
  Proceed to Payment
</button>

</div>}



    

 </div>


  )
}
