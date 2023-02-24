import { Box, Image } from "@chakra-ui/react"

export default function FlightCard({data}) {
    const {id, airline, from, to, departure, arrival, price, totalTime}= data

  return (
    <Box display={"flex"} gap="10px" marginBottom={"20px"}>
        <Image src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/I5.png?v=14" width={"25px"} />
        <h1>{airline}</h1>
    </Box>
    
  )
}
