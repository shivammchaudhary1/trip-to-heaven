import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
// import { addHotel } from '../../Redux/action'
import styled from "styled-components"
import "./Admin.Module.css"
import { Link } from 'react-router-dom'

      
export const AdminHotel = () => {
   
  return (
    <div className='hotelBody'>
      <div id='link'>
      <Link to={"/"}>Home</Link>
      <Link to={"/adminflight"}>Admin Flight</Link>
      <Link to={"/adminhotel"}>Admin Hotel</Link>
      </div>
      
    <div>
        <Wrapper>
        <form >
        <FormControl >
            <Heading id='head'>Admin Panel for Hotel</Heading>
            <Box className='hotelBox'>
            <FormLabel id='label'>Hotel Image</FormLabel>
            <Input id='input' type="url" name="image" />
            <FormLabel  id='label'>Name</FormLabel>
            <Input id='input' type="text" name='name' />
            <FormLabel  id='label'>Place</FormLabel>
            <Input id='input' type="text" name='place' />
            <FormLabel  id='label'>Price</FormLabel>
            <Input id='input' type="number" name='price'/>
            <FormLabel  id='label'>Description</FormLabel>
            <Input id='input' type="text" name='description'/>
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