import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { animation } from './hoc'
import { Link } from 'react-router-dom';


const Info = () => {
  
    const [orderType, toggleOrderType] = useState('Express');
    const orderTypeArray = [
        'Express',
        'Custom'
    ]

    const Items = () => {
        console.log('go to items')
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
                            <li><p>Place in bag</p></li>
                            <li><p>Schedule Pick up date mon-fri after 6pm</p></li>
                            <li><p>Trust us to figure out what has to be done for each of the items</p></li>
                        </ol>
                    </div> : 
                    <div>
                        <ol>
                            <li><p>Gather your garments</p></li>
                            <li><p>Get a count of each item</p></li>
                            <li><p>Proceed to the product page</p></li>
                            <li><p>Add to your shopping card the correct number of items</p></li>
                        </ol>
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
                <button><Link to="/Express">Express Order</Link></button>
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
