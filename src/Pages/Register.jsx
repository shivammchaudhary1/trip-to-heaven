import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import '../styles/login.css';
import firebase_app from '../01_firebase/config_firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userRigister } from '../Redux/Authantication/auth.action';


const auth = getAuth(firebase_app);
const state = {
    number: "",
    otp: "",
    user_name: '',
    password: '',
    verify: false,
    otpVerify: false,
}

export const Register = () => {

    const [check, setCheck] = useState(state);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {number, otp, verify,otpVerify,user_name,password} = check;
    
    const handleRegisterUser = () => {
        let newObj = {
            number,
            user_name,
            password,
            email: "",
            dob: '',
            gender: '',
            marital_status: null,
        }
        dispatch(userRigister(newObj))
        setCheck(state)
        navigate("/login")
    }

    // 
    function onCapture(){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            handleVerifyNumber()
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
        }, auth);
      }
    
      function handleVerifyNumber(){
        onCapture()
        const phoneNumber = `+91${number}`;
        const appVerifier = window.recaptchaVerifier;
            if(number.length === 10){
                //   
                signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                setCheck({...check, verify : true})
                document.querySelector("#loginMesageSuccess").innerHTML = `Otp Send To ${number} !`
                document.querySelector("#loginMesageError").innerHTML = '';
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
              });
            }else{
                document.querySelector("#loginMesageSuccess").innerHTML = ``
                document.querySelector("#loginMesageError").innerHTML = 'Mobile Number is Invalid !'
            }
        }
    
      // 
      function verifyCode() {
        window.confirmationResult.confirm(otp).then((result) => {
          // User signed in successfully.
          const user = result.user;
          setCheck({...check, otpVerify: true})
          document.querySelector("#loginMesageSuccess").innerHTML = `Verifyed Successful`
          document.querySelector("#loginMesageError").innerHTML = ""
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
            document.querySelector("#loginMesageSuccess").innerHTML = ``
            document.querySelector("#loginMesageError").innerHTML = "Invalid OTP"
          // ...
        });
      }

    // 
    const handleChangeMobile = (e) => {
        let val = e.target.value;
        setCheck({...check,[e.target.name]:val})
    }


  return (
    <>
        {/* <Navbar /> */}
        <div className="mainLogin">
            <div id="recaptcha-container"></div>
            <div className="loginBx">
                <div className="loginHead">
                    <h1>Register</h1>
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
                        <label htmlFor="">Enter OTP</label>
                        <span>
                            <input type="number" name="otp" value={otp} onChange={(e) => handleChangeMobile(e)} />
                            <button onClick={verifyCode}>Continue</button>
                        </span>
                    </div>
                 : ''}

                {otpVerify ? 
                <>
                    <div className="loginInputB">
                        <label htmlFor="">Enter Your Full name</label>
                        <span>
                            <input type="text" name="user_name" value={user_name} onChange={(e) => handleChangeMobile(e)} />
                        </span>
                    </div> 
                    <div className="loginInputB">
                        <label htmlFor="">Your Password</label>
                        <span>
                            <input type="password" name="password" value={password} onChange={(e) => handleChangeMobile(e)} />
                        </span>
                    </div>
                    <div className="loginInputB">
                        <button onClick={handleRegisterUser}>Submit</button>
                    </div>
                </>
                :''}
                
                <div className="loginTerms">
                    <h2>Or USE ARE BUSSINESS ACCOUNT WITH</h2>
                    <p>By proceeding, you agree to MakeMyTrip'sT&Csand Privacy</p>
                </div>                
                <br />
                <h3 id="loginMesageError"></h3>
                <h3 id="loginMesageSuccess"></h3>
            </div>
        </div>
    </>
  )
}
