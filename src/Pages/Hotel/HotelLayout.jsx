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
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

const HotelLayout = () => {
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
      <div className="HotelLayoutRight"></div>
    </div>
  );
};

export default HotelLayout;
