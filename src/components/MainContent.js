import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Info from './Info';
import Items from './Items';
import Login from './Login';


const MainContent = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Info/>}/>
        <Route path="/Items" element={<Items/>}/>
        <Route path="/Login" element={<Login/>}/>
    </Routes>
  )
}

export default MainContent
