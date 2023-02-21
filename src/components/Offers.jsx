import React from 'react'
import "../styles/homeOffers.css"

export const Offers = () => {
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
            <div className="cards">
                    <img src="https://promos.makemytrip.com/notification/xhdpi//combined-1-116x116-23122022.jpg" alt="" />
                    <div className="offerData">
                        <p>DOM FLIGHT</p>
                        <h1>Live Now: Big Sale On Flight</h1>
                        <p></p>
                        <button>Book Now</button>
                    </div>
                </div>
                <div className="cards">
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
                </div>
            </div>
        </div>
    </div>
  )
}
