import { Link } from "react-router-dom";
import { Heading, RadioGroup, Stack, Radio, useSafeLayoutEffect } from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../styles/homePage.css";
import { Box, Image } from "@chakra-ui/react";
import FlightList from "./FlightList";
import { Flex, Button, } from "@chakra-ui/react"
const initialState = {
  from: "",
  to: "",
  passenger: 1,
  departureDate: "",
  returnDate: "",
};

export default function Flights() {
  const [PassengerData, setPassengerData] = useState(initialState);
  const [priceValue, setPriceValue] = useState(8);
  const [classes, setClasses] = useState("")
  const [page, setPage] = useState(1)
  const [Packaging, setpackaging] = useState("")

  const handleChange = (e) => {
    setPassengerData({ ...PassengerData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    console.log(PassengerData);
    setPassengerData(initialState);
  };

  const swapValuehandler = () => {
    setPassengerData({
      ...PassengerData,
      from: PassengerData.to,
      to: PassengerData.from,
    });
  };

  return (
    <div style={{ backgroundColor: "rgb(242,242,242)" }}>
      {/* <Navbar /> */}
      <div className="homeTop" style={{ marginBottom: "100px" }}>
        <div className="homeTopCard">
          <div className="secondHeader">
            <Link to="" className="iconCard active">
              <i className="fa fa-plane"></i>
              <h1>Flight</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-hotel"></i>
              <h1>Hotel</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-home"></i>
              <h1>Home Style</h1>
            </Link>
            {/* <Link to="" className="iconCard">
                <i className="fa fa-balloon"></i>
                <i className="fa fa-car"></i>
                <h1>Holiday Packages</h1>
              </Link> */}
            <Link to="" className="iconCard">
              <i className="fa fa-train"></i>
              <h1>Train</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-bus"></i>
              <h1>Bus</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-car"></i>
              <h1>Car</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-money"></i>
              <h1>Forex</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-plane"></i>
              <h1>Charter Plane</h1>
            </Link>
          </div>
          {/*  */}
          <div className="homeInputBx">
            <div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs" />
                <label for="inputs">ONE WAY</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs2" />
                <label for="inputs2">ROUND TRIP</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs3" />
                <label for="inputs3">MULTI CITY</label>
              </div>
            </div>
            <p>Book International and Domestic Flights</p>
          </div>
          {/*  */}
          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>FROM</span>

              {/* from search input */}
              <select
                name="from"
                id="from"
                style={{ width: "200px" }}
                value={PassengerData.from}
                onChange={handleChange}
              >
                <option value="From">From</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>

              <button onClick={swapValuehandler}>
                <i className="fa fa-exchange"></i>
              </button>
            </div>
            <div className="MainSearchinputBx">
              <span>TO</span>

              {/*to search input tag */}

              <select
                name="to"
                id="fromto"
                style={{ width: "200px" }}
                value={PassengerData.to}
                onChange={handleChange}
              >
                <option value="To">To</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>
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

              <input
                type="number"
                value={PassengerData.passenger}
                onChange={handleChange}
                name="passenger"
              />
            </div>
          </div>
          {/*  */}
          <div className="Homeoptions">
            <h3>
              Select A <br /> Fare Type:{" "}
            </h3>
            <div className="optionsInputBx">
              <input type="radio" name="fares" />
              <p>Regular Fares</p>
            </div>
            <div className="optionsInputBx">
              <input type="radio" name="fares" />
              <p>Armed Forces Fares</p>
            </div>
            <div className="optionsInputBx">
              <input type="radio" name="fares" />
              <p>Student Fares</p>
            </div>
            <div className="optionsInputBx">
              <input type="radio" name="fares" />
              <p>Seniour Citizen Fares</p>
            </div>
            <div className="optionsInputBx">
              <input type="radio" name="fares" />
              <p>Doctor & Nurse Fares</p>
            </div>
            <div className="optionsInputBx">
              <input disabled type="radio" name="fares" />
              <p>Double Seat fares</p>
            </div>
          </div>
          {/*  */}
          <div className="homeSearchButtonBx">
            <button onClick={handleClick}>Search</button>
          </div>
        </div>

        {/*  */}
        <div className="homeExplore">
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png"
              alt=""
            />
            <p>Where2Go</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png"
              alt=""
            />
            <p>TripMoney</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png"
              alt=""
            />
            <p>Explore Enternational Flights</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png"
              alt=""
            />
            <p>MICE</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png"
              alt=""
            />
            <p>Gift Cards</p>
          </div>
        </div>
      </div>
      <Box
        display={"flex"}
        padding="0px 40px"
        gap={"30px"}
        width="100%"
        marginBottom={"100px"}
      >
        <Box
          width={"25%"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          height={"auto"}
          padding="20px"
          textAlign={"center"}
        >
          <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Sorting & Filtering</h1>

          <Box>
            <Heading as="h5" size="sm" m="3">
              Price Per Trip
            </Heading>
            <RadioGroup onChange={setPriceValue} value={priceValue}>
              <Stack direction="column">
                <Radio value="5">₹ 4000 - ₹ 5000</Radio>
                <Radio value="6">₹ 5000 - ₹ 6000</Radio>
                <Radio value="7">₹ 6000 - ₹ 7000</Radio>
                <Radio value="8">₹ 7000 - ₹ 8000</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as="h5" size="sm" m="3">
              Filter Class
            </Heading>
            <RadioGroup onChange={setClasses} value={classes}>
              <Stack direction="column">
                <Radio value="eco">Ecomonic Class</Radio>
                <Radio value="business">Business Class</Radio>
                <Radio value="prime">Premium</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as="h5" size="sm" m="3">
              Packaging
            </Heading>
            <RadioGroup onChange={setpackaging} value={Packaging}>
              <Stack direction="column">
                <Radio value="eco">0 - 15 Kg</Radio>
                <Radio value="business"> 15 - 30 Kg</Radio>
                <Radio value="prime"> 30 kg +</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Box>
        <Box
          width={"80%"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          height={"auto"}
          padding="20px"
        >
          <Image
            src="https://mmt.servedbyadbutler.com/getad.img/;libID=3737167"
            width={"90%"}
            margin="auto"
            marginBottom={"20px"}
          />
          <div className="pagination-div">
            {/* Pagination Part UI Start */}
            <Flex m="1">
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => setPage(page - 1)}
                isDisabled={page === 1}
              >
                Previous
              </Button>
              <Button colorScheme="blue" variant="solid">
                {page}
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                isDisabled={page === 4}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </Flex>
            {/* Pagination Part UI End */}
          </div>
          <FlightList page={page} priceValue={priceValue} />
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
