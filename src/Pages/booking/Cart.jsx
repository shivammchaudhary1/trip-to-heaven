import axios from 'axios';
import './Booking.Module.css'
import React, { useEffect, useState } from 'react'

import { ImArrowDown} from "react-icons/im";




export const Cart = () => {


  const[flightcart,setFlightcart] = useState([]);
  
  const [payment,setPayment]=useState(0);

  const [trigger,setTrigger]=useState(false);

  

  useEffect(()=>{
axios.get("  http://localhost:8000/flightcart").then((res)=>{

setFlightcart(res.data);
 console.log(flightcart);
})
},[trigger]);


  useEffect(()=>{
    paymentloop();
  })



  const paymentloop=()=>{

    setPayment(0);
    flightcart.map((el)=>{
      setPayment((pre) =>pre+Number(el.price))

 })
console.log(payment)
  }


const handledelete = (id) =>{

  setTrigger(!trigger)

  axios.delete(`http://localhost:8000/flightcart/${id}`).then((res)=>{
console.log(res);
  }).catch((er)=>{
    console.log(er);
  })

}


  return (
    <div className='container'>

    

    <div className='cart'>
      {
        flightcart.length>0 && 
flightcart.map((el)=>{
console.log("shiv");
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



 <button onClick={()=>handledelete(el.id)}>
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


<a href="">
<button>
  Proceed to Payment
</button>
</a>



</div>}



    

 </div>


  )
}
