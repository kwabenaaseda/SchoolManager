import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ContactUs from './Pages/ContactUs'

const Web_main = () => {
  return (
   <Routes>
          <Route path="/" element={<HomePage/>} />
    <Route path='/contact' element={<ContactUs/>}/>
    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
   </Routes>
  )
}

export default Web_main
