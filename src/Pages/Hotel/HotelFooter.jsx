import React from "react";
import "./HotelStyles/HotelFooter.css";

export const HotelFooter = () => {
  return (
    <footer>
      <div className="footerTerms">
        <div className="footerCard">
          <h1>Why MakeMyTrip?</h1>
          <p>
            Established in 2000, MakeMyTrip has since positioned itself as one
            of the leading companies, providing great offers, competitive
            airfares, exclusive discounts, and a seamless online booking
            experience to many of its customers. The experience of booking your
            flight tickets, hotel stay, and holiday package through our desktop
            site or mobile app can be done with complete ease and no hassles at
            all. We also deliver amazing offers, such as Instant Discounts, Fare
            Calendar, MyRewardsProgram, MyWallet, and many more while updating
            them from time to time to better suit our customers’ evolving needs
            and demands.
          </p>
        </div>
        <div className="footerCard">
          <h1>Booking Flights with MakeMyTrip</h1>
          <p>
            At MakeMyTrip, you can find the best of deals and cheap air tickets
            to any place you want by booking your tickets on our website or app.
            Being India’s leading website for hotel, flight, and holiday
            bookings, MakeMyTrip helps you book flight tickets that are
            affordable and customized to your convenience. With customer
            satisfaction being our ultimate goal, we also have a 24/7 dedicated
            helpline to cater to our customer’s queries and concerns. Serving
            over 5 million happy customers, we at MakeMyTrip are glad to fulfill
            the dreams of folks who need a quick and easy means to find air
            tickets. You can get a hold of the cheapest flight of your choice
            today while also enjoying the other available options for your
            travel needs with us.
          </p>
        </div>
        <div className="footerCard">
          <h1>Domestic Flights with MakeMyTrip</h1>
          <p>
            MakeMyTrip is India's leading player for flight bookings. With the
            cheapest fare guarantee, experience great value at the lowest price.
            Instant notifications ensure current flight status, instant fare
            drops, amazing discounts, instant refunds and rebook options, price
            comparisons and many more interesting features.
          </p>
        </div>
      </div>

      <div className="footerLastBx">
        <div className="footerIcons">
          <i className="fa fa-twitter"></i>
          <i className="fa fa-facebook"></i>
        </div>
        <div className="footerCopyrightbx">
          <h1>© 2023 MAKEMYTRIP PVT. LTD.</h1>
          <h2>
            Country <b>India USA UAE</b>
          </h2>
        </div>
      </div>
    </footer>
  );
};
