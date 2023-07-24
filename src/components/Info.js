import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { faYelp } from '@fortawesome/free-brands-svg-icons';
import { animation } from './hoc'
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import googleMapsLogo from './images/google-maps-2020-icon.svg'

const Info = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const state = params.get('state')

    useEffect(() => {
        if (state === 'verified'){
            navigate('/Login', {state:{message: 'verified'}})
        }
        if (state === 'notverified'){
            navigate('/Login', {state:{message: 'notverified'}})
        }
    },[location])

    const [orderType, toggleOrderType] = useState('Express');

    const cart = {
        Express: '1'
    }

    const Items = () => {
        navigate('/Items')
    }

    const createExpressCart = () => {
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
        navigate('/Cart')
    }

    const navigateToPrices = () => {
        navigate('/Prices')
    }
    const navigateToConfig = () => {
        navigate('/Items')
    }
    const linkTo = (url) => {
        window.open(url, "_blank", "noreferrer");
    }
    const goTo = (url) => {
        navigate(`${url}`)
    }
  return (
    
    <div className='info'>
      <div className='left-info'>
        <div className='left-left'>
            <h2>How - To</h2>
            <div className='left-main'>
                <div className='instructions'>
                    <div className='chevs'>
                        <div className='chev' onClick={() => orderType === "Express" ? toggleOrderType("Custom") : toggleOrderType("Express")}><FontAwesomeIcon icon={faChevronLeft} beat/></div>
                        <h3 className='bold'>{orderType}</h3>
                        <div className='chev' onClick={() => orderType === "Express" ? toggleOrderType("Custom") : toggleOrderType("Express")}><FontAwesomeIcon icon={faChevronRight} beat/></div>
                    </div>
                    {orderType === "Express" ? 
                    <div>
                        <ol>
                            <li><p>Gather all items to be laundered</p></li>
                            <li><p>No need to figure out garment categories or count</p></li>
                            <li><p>Click the "Express Order" button below</p></li>
                            <li><p>This will automatically add an "Express" item to your cart</p></li>
                            <li><p>Review personal information</p></li>
                            <li><p>Place Order</p></li>
                            <li><p>Await email regarging pick up instructions</p></li>
                            <li><p>We will categorize all garments and notify you of our count!</p></li>
                        </ol>
                        <div className='notice'>
                            <p className='dark-accent'>*Recommendation: Create an account and place an express order and we will contact you to guide you through the entire process!</p>
                            <p>*As we do not have an online payment portal, Payment will be taken in-person after the garment has been delivered</p>
                        </div>
                    </div> : 
                    <div>
                        <ol>
                            <li><p>Gather your garments</p></li>
                            <li><p>Separate items into categories using our <span className='link' onClick={navigateToPrices}>PRICES</span> page as reference</p></li>
                            <li><p>Proceed to <span className='link' onClick={navigateToConfig}>CONFIGURATOR</span> tab</p></li>
                            <li><p>Configure your order and click "Add to Cart"</p></li>
                            <li><p>Proceed to cart</p></li>
                            <li><p>Review cart items and personal information</p></li>
                            <li><p>Place Order</p></li>
                            <li><p>Await email regarding pick up instructions</p></li>
                        </ol>
                        <div className='notice'>
                            <p className='dark-accent'>*Recommendation: Create an account and place an express order and we will contact you to guide you through the entire process!</p>
                            <p>*As we do not have an online payment portal, Payment will be taken in-person after the garment has been delivered</p>
                        </div>
                    </div> 
                    }

                </div>
            </div>
            <div className='left-btns'>
                <button onClick={Items}>Customize Order</button>
                <button onClick={createExpressCart}>Express Order</button>
            </div>
        </div>
        <div className='left-right'>
            <h2>About Us</h2>
            <div className='info-about'>
                <div>
                    <h3>History</h3>
                    <p>We have been proudly serving the community since 2008. Always doing our best to create a great experience during your garment cleaning needs!</p>
                </div>
                <div>
                    <h3>What sets us apart</h3>
                    <p>Compared to the vast majority of dry cleaners that use Perchloroethlene to clean garmenets, we at Casa de Cleaners use a process known as Wet Cleaning to wash your beloved garments! Wet cleaning uses solvents that protect clothes from damage, and ensures that your garments don't shrink in the drying process.</p>
                    <p className='link none' onClick={() => goTo('/WetClean')}>Click to learn more about Wet Cleaning</p>
                </div>
            </div>
        </div>
      </div>
      <div className='right-info'>
        <div className='top-right'>
            <h2>Hours</h2>
            <ul>
                <li><div className='hours-day'><p>Monday</p><p>9:00 AM - 6:00 PM</p></div></li>
                <li><div className='hours-day'><p>Tuesday</p><p>9:00 AM - 6:00 PM</p></div></li>
                <li><div className='hours-day'><p>Wednesday</p><p>9:00 AM - 6:00 PM</p></div></li>
                <li><div className='hours-day'><p>Thursday</p><p>9:00 AM - 6:00 PM</p></div></li>
                <li><div className='hours-day'><p>Friday</p><p>9:00 AM - 6:00 PM</p></div></li>
                <li><div className='hours-day'><p>Saturday</p><p>9:00 AM - 5:00 PM</p></div></li>
                <li><div className='hours-day'><p>Sunday</p><p>Closed</p></div></li>
            </ul>
        </div>
        <div className='bottom-right'>
            <div>
                <h2>Location</h2>
                <h3>1739 W San Carlos St</h3>
                <h3>San Jose, CA 95128</h3>
            </div>
            <div className='find-us'>
                <h2>Find Us On</h2>
                <div className='find-us-icon'>
                    <div onClick={()=>linkTo('https://www.yelp.com/biz/casa-de-cleaners-san-jose?osq=casa+de+cleaners')} className='clickable'>
                        <FontAwesomeIcon icon={faYelp} className='yelp' /> <p className='link'>Yelp</p>
                    </div>
                    <div onClick={()=>linkTo('https://www.google.com/maps/place/Casa+De+Cleaners/@37.3237566,-121.923089,17z/data=!4m6!3m5!1s0x808fcb4746d93bc3:0x71593f06b658f770!8m2!3d37.3238729!4d-121.9230581!16s%2Fg%2F1tdxl33_?entry=ttu')} className='clickable'>
                        <img src={googleMapsLogo} alt="" className='map'/> <p className='link'>Google Maps</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default animation(Info)
