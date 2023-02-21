import React from 'react'
import 'font-awesome/css/font-awesome.min.css';

export const Navbar = () => {
    console.log("working")
  return (
    <header>
        <div className="logo">
            <img src="../media/tth.png" alt="" />
            <div className="icons">
                <i className="fa fa-facebook"></i>
                <h1>Katill-boyy</h1>
            </div>
        </div>
    </header>
  )
}
