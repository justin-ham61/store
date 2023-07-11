import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import logo from './images/logo.png'


const Navbar = () => {
  let navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({isAdmin: 0});
  const [isAdmin, setIsAdmin] = useState(false)

  //API call to retrieve user sign in ---------------------------------
  useEffect(() => {
    axios.get('/Auth/api/user')
    .then(response => {
      setUserInfo(response.data.user);
      setAuthenticated(true);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  const value = useContext(AuthContext)
  const [accountMenu, toggleAccountMenu] = useState(false);
  const navVariant = {
      initial: {
        translateX: 50,
        opacity: 0
      },
      in: {
        translateX: 0,
        opacity: 1
      }, 
      out: {
        translateX: 50,
        opacity: 0
      }
  }

  const navTransition = {
    type: 'tween',
    ease: 'linear',
    duration: .2,
  }

  const logOut = () => {
      axios.post('/Auth/Logout')
      .then(response => {
        setAuthenticated(false);
        setUserInfo(null);
        navigate('/')
        console.log(response.data);
      })
      .catch(error => {
        console.error('error', error);
      })
  }

  const myAccount = () => {
    toggleAccountMenu(false);
    navigate('/Account');
  }
  const myOrder = () => {
    toggleAccountMenu(false);
    navigate('/Order');
  }
  const myCart = () => {
    toggleAccountMenu(false);
    navigate('/Cart');
  }

  return (
    <div className="navbar">
        <div className="left-div">
            <Link to="/"><img src={logo} alt="Casa De Cleaners"/></Link>
        </div>
        <div className="right-div">
          <nav>
            <ul>
                <li>About</li>
                <li><Link to="/Prices">Prices</Link></li>
                <li><Link to="/Items">Configurator</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
                {authenticated && userInfo.isAdmin === 1 ? 
                  <li><Link to="/Admin">Admin</Link></li>
                : 
                  null
                }
                <li onClick={() => toggleAccountMenu(!accountMenu)}>Account</li>
            </ul>
          </nav>
        </div>
        <AnimatePresence mode="wait">
        { accountMenu ?
          <motion.div className='account-menu'
            initial="initial"
            animate="in"
            exit="out"
            variants={navVariant}
            transition={navTransition}
          >
            {!authenticated ? 
            <h3><Link to='/Login' onClick={() => toggleAccountMenu(!accountMenu)}>Sign In</Link></h3>
              :
              <>
              <h3>Hi, { userInfo.first_name }!</h3>
              <h3 onClick={myOrder}>My Orders</h3>
              <h3 onClick={myAccount}>My Account</h3>
              <h3 onClick={myCart}>My Cart</h3>
              <h3 onClick={() => logOut()} className='logout-btn'>Sign Out</h3>
              </>
          }
          </motion.div>
        :
        null
      }
      </AnimatePresence>
    </div>
  )
}

export default Navbar
