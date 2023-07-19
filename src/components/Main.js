import React, { useState } from 'react'
import Info from './Info'
import Items from './Items'
import MainContent from './MainContent'
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const Main = () => {
    const [subSection, setSubSection] = useState(0)
    const [menu, setMenu] = useState(false)
    const handleClick = (e) => {
      setMenu(e.target)
    }
     const handleKeyDown = (e) => {
      console.log(e.key)
      if(e.key === 'Escape'){
        setMenu(e.key)
      }
     }
  return (
    <Router>
        <Navbar menu={menu} handleKeyDown={handleKeyDown}/>
        <div className='section main' onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className='overlay'></div>
            <MainContent/>
        </div>
        
    </Router>
  )
}

export default Main
