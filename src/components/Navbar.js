import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import logo from './images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShirt, faCartShopping, faUser, faDollarSign, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({menu, handleKeyDown, handleClick}) => {
  let navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({isAdmin: 0});
  const [ mobileMenu, toggleMobileMenu ] = useState(false)

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

  useEffect(() => {
    toggleAccountMenu(false)
    toggleMobileMenu(false)
  },[menu])

  const handleNavClick = () => {
    if(accountMenu){
      toggleAccountMenu(false)
    }
    if(mobileMenu){
      toggleMobileMenu(false)
    }
  }

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
  const mobileNavVariant = {
    initial:{
      translateX: 1000,
    },
    in: {
      translateX: 0
    },
    out: {
      translateX: 1000
    }
  }

  const mobileNavTransition = {

  }

  const navTransition = {
    type: 'tween',
    ease: 'linear',
    duration: .3,
  }

  const logOut = () => {
      axios.post('/Auth/Logout')
      .then(response => {
        setAuthenticated(false);
        setUserInfo(null);
        navigate('/')
        console.log(response.data);
        toggleAccountMenu(false);
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
  const goTo = (location) => {
    navigate(`/${location}`)
    toggleMobileMenu(false)
  }

  return (
    <div className="navbar" onKeyDown={handleKeyDown} tabIndex={0} onClick={handleClick} onClick={handleNavClick}>
      <AnimatePresence mode='wait'>
        {mobileMenu ? 
         <motion.div 
            className='mobile-menu' onClick={() => toggleMobileMenu(false)}
            initial="initial"
            animate="in"
            exit="out"
            variants={navVariant}
            transition={navTransition}
            >
            <nav>
              <ul>
                  <li onClick={() => goTo('Prices')}>Prices <FontAwesomeIcon icon={faDollarSign} /></li>
                  <li onClick={() => goTo('Items')}>Configurator</li>
                  <li onClick={() => goTo('Contact')}>Contact</li>
                  {authenticated && userInfo.isAdmin === 1 ? 
                    <li>Admin</li>
                  : 
                    null
                  }
                  {authenticated ? 
                  <li onClick={() => toggleAccountMenu(!accountMenu)}>Account <FontAwesomeIcon icon={faUser}/></li>
                  :
                  <li onClick={() => goTo('Login')}>Sign In</li>
                  }
                  <li onClick={() => goTo('Cart')}>Cart <FontAwesomeIcon icon={faCartShopping}/></li>
              </ul>
            </nav>
         </motion.div>
         :
         null
        }
      </AnimatePresence>
        <div className="left-div">
            <Link to="/"><img src={logo} alt="Casa De Cleaners"/></Link>
        </div>
        <div className="right-div">
          <div className='mobile-nav-button'>
            <FontAwesomeIcon icon={faBars} onClick={() => {toggleMobileMenu(!mobileMenu)}} />
          </div>
          <nav>
            <ul>
                <li><Link to="/Prices">Prices</Link></li>
                <li><Link to="/Items">Configurator</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
                {authenticated && userInfo.isAdmin === 1 ? 
                  <li><Link to="/Admin">Admin</Link></li>
                : 
                  null
                }
                {authenticated ? 
                <li onClick={() => toggleAccountMenu(!accountMenu)}>Account</li>
                :
                <li><Link to="/Login">Sign In</Link></li>
                }
                <li><Link to="/Cart">Cart <FontAwesomeIcon icon={faCartShopping}/></Link></li>
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
              <div className='menu-item'>
                <h3 onClick={myAccount}>My Account</h3>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className='menu-item'>
                <h3 onClick={myOrder}>My Orders</h3>
                <FontAwesomeIcon icon={faShirt} />
              </div>
              <div className='menu-item'>
                <h3 onClick={myCart}>My Cart</h3>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <div className='menu-item'>
                <h3 onClick={() => logOut()} className='logout-btn'>Sign Out</h3>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
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
