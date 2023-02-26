import { Box, Image, Flex, Center, Button } from "@chakra-ui/react"

export default function FlightCard({ data }) {
  const { id, airline, from, to, departure, arrival, price, totalTime } = data

  return (
    <Box display={"flex"}
      gap="20px" key={id} height="100px"
      width={"80%"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      padding="10px" margin="auto" justifyContent="space-around"
      alignItems={"center"} borderRadius="10px" marginBottom={"20px"}>
      <Box gap={"10px"}>
        <Image src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/I5.png?v=14" width={"35px"} height="30px" />
        <h1>{airline}</h1>
      </Box>
      <Flex display={"flex"} flexDirection="column">
        <h3>{departure}</h3>
        <b>{from} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>{arrival}</h3>
        <b>{to} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Duation</h3>
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
