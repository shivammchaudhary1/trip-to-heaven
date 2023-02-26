import { Box, Image, Flex, Center, Button } from "@chakra-ui/react"

export default function FlightCard({ data }) {
  const { id, airline, from, to, departure, arrival, price, totalTime } = data





  return (
    <Box display={"flex"}
      gap="20px" key={id} height="100px"
      width={"80%"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      padding="10px" margin="auto" justifyContent="space-around"
      alignItems={"center"} borderRadius="10px" marginBottom={"20px"} textAlign="center">
      <Box gap={"30px"}>
        <Image src="https://play-lh.googleusercontent.com/OhZSLjRDLvFLqtDp9bIgcvAweZIg5V5uIMI_7kOaS-9nPR043DUfoibkn1BgwG7Ai1U=w240-h480-rw" width={"35px"} height="30px" />
        <h1>{airline}</h1>
      </Box>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Departure</h3>
        <h3>{departure}</h3>
        <b>{from} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Arrival</h3>
        <h3>{arrival}</h3>
        <b style={{ fontSize: "14px" }}>{to} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3 >Duation</h3>
        <b>{totalTime}</b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Price</h3>
        <b>{price}</b>
      </Flex>
      <Button colorScheme='blue'>Button</Button>
    </Box>

  )
}
