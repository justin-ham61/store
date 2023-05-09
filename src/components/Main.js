import React, { useState } from 'react'
import Info from './Info'
import Items from './Items'
import MainContent from './MainContent'
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const Main = () => {
    const [subSection, setSubSection] = useState(0)

  return (
    <Router>
        <Navbar/>
        <div className='section main'>
            <MainContent/>
        </div>
    </Router>
  )
}

export default Main
