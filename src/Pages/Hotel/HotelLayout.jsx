import React, { useState } from "react";
import "./HotelLayout.css";
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
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

const HotelLayout = (prop) => {
  console.log(prop);

  const [priceValue, setPriceValue] = useState("");
  const [starValue, setStarValue] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [houseRulesValue, setHouseRulesValue] = useState("");
  return (
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
              Price Per Night
            </Heading>
            <RadioGroup onChange={setPriceValue} value={priceValue}>
              <Stack direction="column">
                <Radio value="1">₹ 0 - ₹ 2000</Radio>
                <Radio value="2">₹ 2000 - ₹ 3000</Radio>
                <Radio value="3">₹ 3000 - ₹ 4000</Radio>
                <Radio value="4">₹ 4000 - ₹ 5000</Radio>
                <Radio value="5">₹ 5000 - ₹ 6000</Radio>
                <Radio value="6">₹ 6000 - ₹ 7000</Radio>
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
        {prop.DefaultData.map((el) => {
          return (
            <div className="HotelCard" key={el.id}>
              <div className="ImgDiv">
                <img src={el.image} alt={el.id} />
              </div>
              <div>
                <h3>Category: </h3>
                <h4>{el.id}</h4>
                <h4>{el.heading}</h4>
                <p>{el.about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelLayout;




// import {
//     Box,
//     chakra,
//     Container,
//     Stack,
//     Text,
//     Image,
//     Flex,
//     VStack,
//     Button,
//     Heading,
//     SimpleGrid,
//     StackDivider,
//     useColorModeValue,
//     VisuallyHidden,
//     List,
//     ListItem,
//   } from '@chakra-ui/react';
//   import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
//   import { MdLocalShipping } from 'react-icons/md';
  
//   export default function Simple() {
//     return (
//       <Container maxW={'7xl'}>
//         <SimpleGrid
//           columns={{ base: 1, lg: 2 }}
//           spacing={{ base: 8, md: 10 }}
//           py={{ base: 18, md: 24 }}>
//           <Flex>
//             <Image
//               rounded={'md'}
//               alt={'product image'}
//               src={
//                 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
//               }
//               fit={'cover'}
//               align={'center'}
//               w={'100%'}
//               h={{ base: '100%', sm: '400px', lg: '500px' }}
//             />
//           </Flex>
//           <Stack spacing={{ base: 6, md: 10 }}>
//             <Box as={'header'}>
//               <Heading
//                 lineHeight={1.1}
//                 fontWeight={600}
//                 fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
//                 Automatic Watch
//               </Heading>
//               <Text
//                 color={useColorModeValue('gray.900', 'gray.400')}
//                 fontWeight={300}
//                 fontSize={'2xl'}>
//                 $350.00 USD
//               </Text>
//             </Box>
  
//             <Stack
//               spacing={{ base: 4, sm: 6 }}
//               direction={'column'}
//               divider={
//                 <StackDivider
//                   borderColor={useColorModeValue('gray.200', 'gray.600')}
//                 />
//               }>
//               <VStack spacing={{ base: 4, sm: 6 }}>
//                 <Text
//                   color={useColorModeValue('gray.500', 'gray.400')}
//                   fontSize={'2xl'}
//                   fontWeight={'300'}>
//                   Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
//                   diam nonumy eirmod tempor invidunt ut labore
//                 </Text>
//                 <Text fontSize={'lg'}>
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
//                   aliquid amet at delectus doloribus dolorum expedita hic, ipsum
//                   maxime modi nam officiis porro, quae, quisquam quos
//                   reprehenderit velit? Natus, totam.
//                 </Text>
//               </VStack>
//               <Box>
//                 <Text
//                   fontSize={{ base: '16px', lg: '18px' }}
//                   color={useColorModeValue('yellow.500', 'yellow.300')}
//                   fontWeight={'500'}
//                   textTransform={'uppercase'}
//                   mb={'4'}>
//                   Features
//                 </Text>
  
//                 <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
//                   <List spacing={2}>
//                     <ListItem>Chronograph</ListItem>
//                     <ListItem>Master Chronometer Certified</ListItem>{' '}
//                     <ListItem>Tachymeter</ListItem>
//                   </List>
//                   <List spacing={2}>
//                     <ListItem>Anti‑magnetic</ListItem>
//                     <ListItem>Chronometer</ListItem>
//                     <ListItem>Small seconds</ListItem>
//                   </List>
//                 </SimpleGrid>
//               </Box>
//               <Box>
//                 <Text
//                   fontSize={{ base: '16px', lg: '18px' }}
//                   color={useColorModeValue('yellow.500', 'yellow.300')}
//                   fontWeight={'500'}
//                   textTransform={'uppercase'}
//                   mb={'4'}>
//                   Product Details
//                 </Text>
  
//                 <List spacing={2}>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Between lugs:
//                     </Text>{' '}
//                     20 mm
//                   </ListItem>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Bracelet:
//                     </Text>{' '}
//                     leather strap
//                   </ListItem>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Case:
//                     </Text>{' '}
//                     Steel
//                   </ListItem>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Case diameter:
//                     </Text>{' '}
//                     42 mm
//                   </ListItem>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Dial color:
//                     </Text>{' '}
//                     Black
//                   </ListItem>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Crystal:
//                     </Text>{' '}
//                     Domed, scratch‑resistant sapphire crystal with anti‑reflective
//                     treatment inside
//                   </ListItem>
//                   <ListItem>
//                     <Text as={'span'} fontWeight={'bold'}>
//                       Water resistance:
//                     </Text>{' '}
//                     5 bar (50 metres / 167 feet){' '}
//                   </ListItem>
//                 </List>
//               </Box>
//             </Stack>
  
//             <Button
//               rounded={'none'}
//               w={'full'}
//               mt={8}
//               size={'lg'}
//               py={'7'}
//               bg={useColorModeValue('gray.900', 'gray.50')}
//               color={useColorModeValue('white', 'gray.900')}
//               textTransform={'uppercase'}
//               _hover={{
//                 transform: 'translateY(2px)',
//                 boxShadow: 'lg',
//               }}>
//               Add to cart
//             </Button>
  
//             <Stack direction="row" alignItems="center" justifyContent={'center'}>
//               <MdLocalShipping />
//               <Text>2-3 business days delivery</Text>
//             </Stack>
//           </Stack>
//         </SimpleGrid>
//       </Container>
//     );
//   }