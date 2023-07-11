import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Info from './Info';
import Items from './Items';
import Login from './Login';
import Register from './Register';
import Contact from './Contact';
import Express from './Express';
import Account from './Account';
import Order from './Order';
import Admin from './Admin';
import Cart from './Cart';
import Checkout from './Checkout';
import Prices from './Prices';
import Confirmation from './Confirmation';
import RegisterV2 from './RegisterV2';

const MainContent = () => {
  return (
      <AnimatePresence mode="wait">
        <Routes>
            <Route exact path="/" element={<Info/>}/>
            <Route path="/Items" element={<Items/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/Register" element={<RegisterV2/>}/>
            <Route path="/Express" element={<Express/>}/>
            <Route path="/Account" element={<Account/>}/>
            <Route path="/Order" element={<Order/>}/>
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Checkout" element={<Checkout/>}/>
            <Route path="/Prices" element={<Prices/>}/>
            <Route path="/Confirmation" element={<Confirmation/>}/>
        </Routes>
      </AnimatePresence>
  )
}

export default MainContent
