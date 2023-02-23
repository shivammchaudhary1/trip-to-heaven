import React from 'react'

export const HomePageComponent = () => {

    
  const swapValuehandler = () => {
    let from = document.getElementById("from");
    let to = document.getElementById("fromTo");
    let temp1 = from.value;
    let temp2 = to.value;
    // console.log(from,to)
    from.value = temp2
    to.value= temp1
  }


  return (
    <>
        <div className="homeInputBx">
            <div>
            <div className="homeInputs">
                <input name="type" type="radio" id='inputs' />
                <label for='inputs'>ONE WAY</label>
            </div>
            <div className="homeInputs">
                <input checked name="type" type="radio" id='inputs2' />
                <label for='inputs2'>ROUND TRIP</label>
            </div>
            <div className="homeInputs">
                <input name="type" type="radio" id='inputs3' />
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
    </>
  )
}
