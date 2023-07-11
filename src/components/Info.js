import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { animation } from './hoc'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


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
    const orderTypeArray = [
        'Express',
        'Custom'
    ]

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

  return (
    
    <div className='info'>
      <div className='left-info'>
        <div className='left-left'>
            <h2>How - To</h2>
            <div className='left-main'>
                <div className='instructions'>
                    <h3>{orderType}</h3>
                    {orderType == "Express" ? 
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
                            <p>*As we do not have an online payment portal, Payment will be taken in-person after the garment has been delivered</p>
                        </div>
                    </div> : 
                    <div>
                        <ol>
                            <li><p>Gather your garments</p></li>
                            <li><p>Separate items into categories using our PRICES page as reference</p></li>
                            <li><p>Proceed to CONFIGURATOR tab</p></li>
                            <li><p>Configure your order and click "Add to Cart"</p></li>
                            <li><p>Proceed to cart</p></li>
                            <li><p>Review cart items and personal information</p></li>
                            <li><p>Place Order</p></li>
                            <li><p>Await email regarding pick up instructions</p></li>
                        </ol>
                        <div className='notice'>
                            <p>*As we do not have an online payment portal, Payment will be taken in-person after the garment has been delivered</p>
                        </div>
                    </div> 
                    }

                </div>
            </div>
            <div className='chevs'>
                <div className='chev' onClick={() => orderType == "Express" ? toggleOrderType("Custom") : toggleOrderType("Express")}><FontAwesomeIcon icon={faChevronLeft}/></div>
                <div className='chev' onClick={() => orderType == "Express" ? toggleOrderType("Custom") : toggleOrderType("Express")}><FontAwesomeIcon icon={faChevronRight}/></div>
            </div>
            <div className='left-btns'>
                <button onClick={Items}>Customize Order</button>
                <button onClick={createExpressCart}>Express Order</button>
            </div>
        </div>
        <div className='left-right'>
            <h2>About Us</h2>
            <div className='info-about'>
                <h3>History</h3>
                <p>We've been proudly serving the community since 2008</p>
                <h3>Our Methods</h3>
                <p>Our special method of garment cleaning sets us apart from others by using enviromentally friendly methods that are safer for all of us</p>
                <h3></h3>
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
            <h2>Location</h2>
            <p>1739 W San Carlos St</p>
            <p>San Jose, CA 95128</p>
        </div>
      </div>
    </div>
  )
}

export default animation(Info)
