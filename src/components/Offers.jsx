import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getOffers } from '../Redux/Offers/offer.action'
import "../styles/homeOffers.css"

export const Offers = () => {
    const [limit, setLimit] = useState(5)
    const dispatch = useDispatch()
    const location = useLocation()
    const {isLoading,isError,offers} = useSelector((store) => {
        // console.log(store)
        return {
            isLoading: store.OfferReducer.isLoading,
            isError: store.OfferReducer.isError,
            offers: store.OfferReducer.offers,
        }
    },shallowEqual)

    const handleMoreOffers = () => {
        if(offers.length >= limit){
            setLimit((prev) => prev + 5)
        }
    }

    useEffect(() => {
        dispatch(getOffers(limit))
    },[limit])

  return (
    <div className="homeOffers">
        <div className="offerCard">
            <div className="offerHead">
                <h1>Offers</h1>
                <div className="allTabs">
                    <div className="offerTabs active">
                        <h2>ALL OFFERS</h2>
                    </div>
                    <div className="offerTabs">
                        <h2>BANK OFFERS</h2>
                    </div>
                    <div className="offerTabs">
                        <h2>FLIGHTS</h2>
                    </div>
                    <div className="offerTabs">
                        <h2>HOTEL</h2>
                    </div>
                    <div className="offerTabs">
                        <h2>HOLIDAY</h2>
                    </div>
                    <div className="offerTabs">
                        <h2>TRAINS</h2>
                    </div>
                    <div className="offerTabs">
                        <h2>CABS</h2>
                    </div>
                </div>
            </div>

            <div className="MaincardOfferBx">
                {offers.map((ele,i) => (
                    <div key={i} className="cards">
                        <img src={ele.image} alt="" />
                        <div className="offerData">
                            <p>DOM FLIGHT</p>
                            <h1>{ele.title}</h1>
                            <p></p>
                            <button>Book Now</button>
                        </div>
                    </div>
                ))}

                {/* <div className="cards">
                    <img src="https://promos.makemytrip.com/notification/xhdpi//Desktop-DF-Extended-17Feb.jpg" alt="" />
                    <div className="offerData">
                        <p>DOM FLIGHT</p>
                        <h1>LIVE NOW: Up to OFF* on Domestic Flights</h1>
                        <p></p>
                        <button>Book Now</button>
                    </div>
                </div>
                <div className="cards">
                    <img src="https://promos.makemytrip.com/notification/xhdpi//Desktop-IF-Extended-17Feb.jpg" alt="" />
                    <div className="offerData">
                        <p>DOM FLIGHT</p>
                        <h1>FLAT OFF* on Outstation Cabs</h1>
                        <p></p>
                        <button>Book Now</button>
                    </div>
                </div>

                <div className="cards">
                    <img src="https://promos.makemytrip.com/notification/xhdpi//Desktop_DH-TravelFest_16Feb.jpg" alt="" />
                    <div className="offerData">
                        <p>DOM FLIGHT</p>
                        <h1>Live Now: Big Sale On Flight</h1>
                        <p></p>
                        <button>Book Now</button>
                    </div>
                </div>
                <div className="cards">
                    <img src="https://promos.makemytrip.com/notification/xhdpi//Desktop-IF-USA-20Feb.jpg" alt="" />
                    <div className="offerData">
                        <p>DOM FLIGHT</p>
                        <h1>LIVE NOW: Up to OFF* on Domestic Flights</h1>
                        <p></p>
                        <button>Book Now</button>
                    </div>
                </div>
                <div className="cards">
                    <img src="https://promos.makemytrip.com/notification/xhdpi//Desktop-IF-Australia-20Feb.jpg" alt="" />
                    <div className="offerData">
                        <p>DOM FLIGHT</p>
                        <h1>FLAT OFF* on Outstation Cabs</h1>
                        <p></p>
                        <button>Book Now</button>
                    </div>
                </div> */}
            </div>
            {isLoading ? <h1>Please wait...</h1> : ""}
            <div className="offerBtnBx">
                {limit > offers.length  ? "" : <button onClick={handleMoreOffers}>More</button>}
            </div>
        </div>
        {/*  */}
        <div className="offerDonwloadApp">
            <div className="donwloadhead">
                <h1>Donwload App Now !</h1>
                <p>Get India's #1 travel super app, join 100 Million+ happy travellers!</p>
            </div>
            <div className="donwloadBox">
                {/* <p>Use code WELCOMEMMT and get upto Rs 1200 off on your first domestic flight booking</p> */}
                <div className="downloadInputbx">
                    <input style={{width : "50px", textAlign: "center", padding: "10px 0", borderRight: "none"}} readOnly type="text" value="+91" />
                    <input placeholder='Enter Your Mobile Number' type="number" style={{borderLeft: "none"}} />
                    <button>GET APP LINK</button>
                </div>

                <div className="donwloadButtons">
                    <p>MORE WAY TO GET THE APP</p>
                    <button> <i className="fa fa-play"></i> Google Play</button>
                    <button> <i className="fa fa-apple"></i> Apple Store</button>
                </div>
                <div className='downloadQr'>
                    <img src="https://promos.makemytrip.com/notification/xhdpi/QRCodeDT_QR-code.jpg" alt="" />
                </div>
            </div>
        </div>

    </div>
  )
}
