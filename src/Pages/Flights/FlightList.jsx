import React, { useEffect } from 'react'
import axios from 'axios'
import FlightCard from './FlightCard'

const getData = async () => {
    let res = await axios.get(`http://localhost:8000/flight?_limit=5`)
    return res.data
}


export default function FlightList() {
    const [data, setData] = React.useState([])

    useEffect(() => {
        getData().then(res => {
            setData(res)
            // console.log(data)
        })
    }, [data.length])


    return (
        <div>
            {data.length > 0 && data.map((item) => {
                return <div key={item.id}>
                    <FlightCard data={item} />
                </div>
            })}
        </div>
    )
}
