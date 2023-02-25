import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
// import { addHotel } from '../../Redux/action'
import styled from "styled-components"
import "./Admin.Module.css"
import { Link } from 'react-router-dom'
import { useState } from 'react';
// import { useDispatch } from 'react-redux';

let initialState = {
  image: "",
  name: "",
  place: "",
  price: "",
  description: "",
};   
export const AdminHotel = () => {
  const [hotel, setHotel] = useState(initialState);
  // const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotel((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hotel);
    // dispatch(addHotel(hotel));
    setHotel(initialState);
  };

  return (
    <div className='hotelBody'>
      <div id='link'>
      <Link to={"/"}>Home</Link>
      <Link to={"/adminflight"}>Admin Flight</Link>
      <Link to={"/adminhotel"}>Admin Hotel</Link>
      </div>
      
    <div>
        <Wrapper>
        <form onSubmit={(e) => {
              handleSubmit(e);
            }}>
        <FormControl >
            <Heading id='head'>Admin Panel for Hotel</Heading>
            <Box className='hotelBox'>
            <FormLabel id='label'>Hotel Image</FormLabel>
            <Input id='input' type="url" name="image" value={hotel.image} onChange={(e) => handleChange(e)} />
            <FormLabel  id='label'>Name</FormLabel>
            <Input id='input' type="text" name='name' value={hotel.name} onChange={(e) => handleChange(e)}/>
            <FormLabel  id='label'>Place</FormLabel>
            <Input id='input' type="text" name='place' value={hotel.place} onChange={(e) => handleChange(e)}/>
            <FormLabel  id='label'>Price</FormLabel>
            <Input id='input' type="number" name='price' value={hotel.price} onChange={(e) => handleChange(e)}/>
            <FormLabel  id='label'>Description</FormLabel>
            <Input id='input' type="text" name='description' value={hotel.description} onChange={(e) => handleChange(e)}/>
            <Button id='btn'  variant='outline' type='submit'>Add Hotel Info</Button>
            </Box>  
        </FormControl>
        </form>
        </Wrapper>
    </div>
    </div>
  )
}
const Wrapper = styled.div`
    padding:10px;
    width:40%;
    
`;