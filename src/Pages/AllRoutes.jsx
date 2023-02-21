import React from 'react'
import {Routes, Route} from "react-router-dom"
import { HomePage } from "./HomePage";

export const AllRoutes = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes> 
    </>
  )
}
