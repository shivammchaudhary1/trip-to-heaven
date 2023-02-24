import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'


const state = {
    number: "",
    otp: "",
    verify: false,
}

export const Login = () => {
    const [check, setCheck] = useState(state);
    const {number, otp, verify} = check;

    const handleChangeMobile = (e) => {
        let val = e.target.value;
        setCheck({...check,[e.target.name]:val})
    }
    const handleVerifyNumber = () => {
        if(number.length == 10){
            setCheck({...check, verify : true})
            document.querySelector("#loginMessages").innerHTML = `Otp Send To ${number} !`
        }else{
            document.querySelector("#loginMessages").innerHTML = 'Mobile Number is Invalid !'
        }
    }
    // console.log(check)

  return (
    <>
        <div className="mainLogin">
            <div className="loginBx">
                <div className="loginHead">
                    <h1>Login</h1>
                </div>
                <div className="loginInputB">
                        <label htmlFor="">Enter Your Number</label>
                    <span>
                        <input type="number" readOnly={verify} name="number" value={number} onChange={(e) => handleChangeMobile(e)} />
                        <button disabled={verify}  onClick={handleVerifyNumber}>Verify</button>
                    </span>
                </div>
                {verify ?
                    <div className="loginInputB">
                        <label htmlFor="">Enter Your OTP</label>
                        <span>
                            <input type="number" name="otp" value={otp} onChange={(e) => handleChangeMobile(e)} />
                            <button>Continue</button>
                        </span>
                    </div>
                 : ''}
                
                <div className="loginTerms">
                    <h2>Or USE ARE BUSSINESS ACCOUNT WITH</h2>
                    <p>By proceeding, you agree to MakeMyTrip'sT&Csand Privacy</p>
                </div>
                <Link to="/register">Don't have an Account</Link>
                <h3 id="loginMessages"></h3>
            </div>
        </div>
    </>
  )
}
