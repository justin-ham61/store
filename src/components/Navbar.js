import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className="navbar">
        <div className="left-div">
            <Link to="/"><img src="" alt="Casa De Cleaners" /></Link>
        </div>
        <div className="right-div">
          <nav>
            <ul>
                <li>About</li>
                <li><Link to="/Items">Order</Link></li>
                <li>Contact</li>
                <li><Link to="/Login">Account</Link></li>
            </ul>
          </nav>
        </div>
    </div>
  )
}
