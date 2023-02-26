import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Link as RouteLink } from "react-router-dom";
import "./HotelStyles/HotelLayout.css";
import {
  Radio,
  RadioGroup,
  Box,
  Heading,
  Stack,
  VStack,
  StackDivider,
  Button,
  ButtonGroup,
  Text,
  Image,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Img,
} from "@chakra-ui/react";
import { HotelFooter } from "./HotelFooter";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  hotelFailureAction,
  hotelRequestAction,
  hotelSuccessAction,
} from "../../Redux/HotelRedux/actionHotel";
import HotelDetails from "./HotelDetails";

const HotelSubNavbar = () => {
  // Default Data

  const [person, setPerson] = useState("");
  const [searchHotel, setSearchHotel] = useState("");
  const [sorting, setSorting] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [starValue, setStarValue] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [houseRulesValue, setHouseRulesValue] = useState("");
  const [page, setPage] = useState(1);
  // http://localhost:8000/hotel?q=${query}&_page=${page}&_limit=8

  //redux importing

  const handlePerson = (e) => {
    setPerson(e.target.value);
    // console.log(person);
  };
  console.log(sorting);

  const { hotel, isLoading, isError } = useSelector((store) => {
    // console.log(store.reducerHotel);
    return {
      hotel: store.reducerHotel.hotel,
      isLoading: store.reducerHotel.isLoading,
      isError: store.reducerHotel.isError,
    };
  }, shallowEqual);
  // console.log(isError);

  const dispatch = useDispatch();
  // _page=7&_limit=20
  const getHotelData = () => {
    dispatch(hotelRequestAction());
    axios
      .get(`http://localhost:8000/hotel?_page=${page}_limit=10`)
      .then((res) => {
        // console.log(res.data);
        dispatch(hotelSuccessAction(res.data));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(hotelFailureAction());
      });
  };

  useEffect(() => {
    getHotelData();
  }, [page]);

  // Button Functions

  const handleHotelSearch = (e) => {
    setSearchHotel(e.target.value);
    console.log(searchHotel);
  };

  const HandleSearchButton = () => {
    dispatch(hotelRequestAction());
    axios
      .get(
        `http://localhost:8000/hotel?q=${searchHotel}&_page=${page}&_limit=10`
      )
      .then((res) => {
        dispatch(hotelSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(hotelFailureAction());
      });
  };

  // sorting

  const HandleSorting = (sorting) => {
    dispatch(hotelRequestAction());
    axios
      .get(
        `http://localhost:8000/hotel?_page=${page}&_limit=10&_sort=price&_order=${sorting}`
      )
      .then((res) => {
        dispatch(hotelSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(hotelFailureAction());
      });
  };
  useEffect(() => {
    HandleSorting(sorting);
  }, [sorting]);

  // get via range

  // posts?

  const HandlePriceRange = (priceValue) => {
    dispatch(hotelRequestAction());
    axios
      .get(
        `http://localhost:8000/hotel?_page=${page}&_limit=10&price_gte=${
          priceValue - 1000
        }&price_lte=${priceValue}`
      )
      .then((res) => {
        dispatch(hotelSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(hotelFailureAction());
      });
  };
  useEffect(() => {
    HandlePriceRange(priceValue);
  }, [priceValue]);

  return (
    <div>
      <div className="homeTop">
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

          {/* Sub Navbar for Hotels Start */}

          <div className="homeInputBx">
            <div>
              <div className="homeInputs">
                <input checked="checked" name="type" type="radio" id="inputs" />
                <label for="inputs">UPTO 5 ROOMS</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs2" />
                <label for="inputs2">GROUP DEAL</label>
              </div>
            </div>
            <p>Book International and Domestic Flights</p>
          </div>
          {/*  */}
          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>CITY, PROPERTY NAME OR LOCATION</span>
              <input
                id="from"
                type="text"
                value={searchHotel}
                placeholder="Search Hotel"
                onChange={handleHotelSearch}
              />
            </div>
            <div className="MainSearchinputBx">
              <span>CHECK-IN</span>
              <input type="date" />
            </div>
            <div className="MainSearchinputBx">
              <span>CHECK-OUT</span>
              <input type="date" />
            </div>
            <div className="MainSearchinputBx">
              <span>ROOMS & GUESTS</span>
              <input
                type="number"
                placeholder="Person"
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  padding: "0 20px",
                }}
                value={person}
                onChange={handlePerson}
              />
            </div>
          </div>
          {/* Sub Navbar for Hotels Ends  */}
          <div className="homeSearchButtonBx">
            <button onClick={HandleSearchButton}>Search</button>
          </div>
        </div>
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

      {/* Hotel Layout  */}
      {/* Hotel Layout  */}

      {/* <HotelLayout DefaultData={DefaultData} /> */}
      <div className="HotelLayoutParent">
        <div className="HotelLayoutLeft">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            <Box>
              <Heading as="h4" size="md">
                Sorting & Filtering
              </Heading>
            </Box>
            <Box>
              <Heading as="h5" size="sm" m="3">
                Price
              </Heading>
              <RadioGroup onChange={setSorting} value={sorting}>
                <Stack direction="column">
                  <Radio value="asc">Low to High</Radio>
                  <Radio value="desc">High to Low</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              <Heading as="h5" size="sm" m="3">
                Price Per Night
              </Heading>
              <RadioGroup onChange={setPriceValue} value={priceValue}>
                <Stack direction="column">
                  <Radio value="2000">₹ 0 - ₹ 2000</Radio>
                  <Radio value="3000">₹ 2000 - ₹ 3000</Radio>
                  <Radio value="4000">₹ 3000 - ₹ 4000</Radio>
                  <Radio value="5000">₹ 4000 - ₹ 5000</Radio>
                  <Radio value="6000">₹ 5000 - ₹ 6000</Radio>
                  <Radio value="7000">₹ 6000 - ₹ 7000</Radio>
                  <Radio value="8000">₹ 7000 - ₹ 8000</Radio>
                  <Radio value="9000">₹ 8000 - ₹ 9000</Radio>
                  <Radio value="1000">₹ 9000 - ₹ 10,000+</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Box>
              <Heading as="h5" size="sm" m="3">
                Star Category
              </Heading>
              <RadioGroup onChange={setStarValue} value={starValue}>
                <Stack direction="column">
                  <Radio value="1">5 Star</Radio>
                  <Radio value="2">4 Star</Radio>
                  <Radio value="3">3 Star</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Box>
              <Heading as="h5" size="sm" m="3">
                Property Type
              </Heading>

              <RadioGroup onChange={setPropertyValue} value={propertyValue}>
                <Stack direction="column">
                  <Radio value="1">Hotel</Radio>
                  <Radio value="2">Apartment</Radio>
                  <Radio value="3">Villa</Radio>
                  <Radio value="4">HomeStay</Radio>
                  <Radio value="5">Resort</Radio>
                  <Radio value="1">Camp</Radio>
                  <Radio value="2">Hostel</Radio>
                  <Radio value="3">Guest House</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Box>
              <Heading as="h5" size="sm" m="3">
                House Rules
              </Heading>
              <RadioGroup onChange={setHouseRulesValue} value={houseRulesValue}>
                <Stack direction="column">
                  <Radio value="1">Pets Allowed</Radio>
                  <Radio value="2">Unmarried Couples Allowed</Radio>
                  <Radio value="3">Bachelors Allowed</Radio>
                  <Radio value="4">Alcohol Allowed</Radio>
                  <Radio value="5">Smoking Allowed</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              <ButtonGroup variant="outline" spacing="6">
                <RouteLink to="/hotel">
                  <Button colorScheme="blue">Back To Top</Button>
                </RouteLink>
              </ButtonGroup>
            </Box>
          </VStack>
        </div>
        <div className="HotelLayoutRight">
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
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </Flex>
            {/* Pagination Part UI End */}
          </div>
          {isLoading && (
            <Image src="https://i.ibb.co/2jqK3wx/loader.gif" alt="...Loading" />
          )}
          {hotel.length == 0 && (
            <Heading>
              We apologize for any inconvenience, but unfortunately, we do not
              currently have any hotels available at the {searchHotel} location.
            </Heading>
          )}
          {hotel.length > 0 &&
            hotel.map((el) => {
              return (
                <div className="HotelCard">
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    p="2"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={el.image}
                      alt="Image Not Loading"
                    />

                    <Stack w="70%">
                      <CardBody>
                        <Box bg="blue.100" borderRadius="2" p="1px" w="100%">
                          Rating : {el.rating}
                        </Box>
                        <Heading size="md">{el.name}</Heading>
                        <Text py="2">{el.place}</Text>
                        <Heading
                          size="sm"
                          bg="gray.100"
                          p="1"
                          borderRadius="5px"
                        >
                          {el.description}
                        </Heading>
                        <Box>
                          <Text mt="2" color="green">
                            {el.additional}
                          </Text>
                        </Box>
                      </CardBody>
                    </Stack>
                    <Stack bg="blue.100" borderRadius="5" w="25%">
                      <CardBody m="auto">
                        <Heading size="lg">₹ {el.price}</Heading>
                        <Text size="sm">+ ₹ {el.taxes} Taxes & Fees</Text>
                      </CardBody>
                      <CardFooter>
                        <RouteLink to={`/hotel/${el.id}`}>
                          {/* <HotelDetails
                            image={el.image}
                            img1={el.img1}
                            img2={el.img2}
                            img3={el.img3}
                            img4={el.img4}
                            rating="4.5"
                            ratingText="Very Good"
                            name={el.name}
                            place={el.place}
                            description={el.description}
                            additional={el.additional}
                            taxes={el.taxes}
                            price={el.price}
                            id={el.id}
                          /> */}
                          <Button variant="solid" colorScheme="blue">
                            Book Now
                          </Button>
                        </RouteLink>
                      </CardFooter>
                    </Stack>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
      {/* <HotelDetails person={person} /> */}
      <HotelFooter />
    </div>
  );
};

export default HotelSubNavbar;
