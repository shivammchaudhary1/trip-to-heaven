import { Box, Image, Flex } from "@chakra-ui/react"

export default function FlightCard({data}) {
    const {id, airline, from, to, departure, arrival, price, totalTime}= data

  return (
    <Box display={"flex"} gap="10px" marginBottom={"20px"} key={id}>
        <Flex>
        <Image src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/I5.png?v=14" width={"25px"} />
        <h1>{airline}</h1>
        </Flex>
        <Flex>
          {departure}
          {from}
        </Flex>
        <Flex>
          {arrival}
          {to}
        </Flex> 
        <h2>{price}</h2>
        <h3>`Duration${totalTime}`</h3>
    </Box>
    
  )
}
