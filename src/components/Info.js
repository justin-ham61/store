import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Info = () => {
  
    const [orderType, toggleOrderType] = useState('Express');
    const orderTypeArray = [
        'Express',
        'Custom'
    ]

  return (
    
    <div className='info sub-section'>
      <div className='left-info'>
        <div className='left-left'>
            <h2>How - To</h2>
            <div className='left-main'>
                <div className='chev' onClick={() => orderType == "Express" ? toggleOrderType("Custom") : toggleOrderType("Express")}><FontAwesomeIcon icon={faChevronLeft}/></div>
                <div className='instructions'>
                    <h1>{orderType}</h1>

                    {orderType == "Express" ? 
                    <div>
                        <ol>
                            <li>Gather all items to be laundered</li>
                            <li>Place in bag</li>
                            <li>Schedule Pick up date mon-fri after 6pm</li>
                            <li>Trust us to figure out what has to be done for each of the items</li>
                        </ol>
                    </div> : 
                    <div>
                        <ol>
                            <li>Gather your garments</li>
                            <li>Get a count of each item</li>
                            <li>Proceed to the product page</li>
                            <li>Add to your shopping card the correct number of items</li>
                        </ol>
                    </div> 
                    }

                </div>
                <div className='chev' onClick={() => orderType == "Express" ? toggleOrderType("Custom") : toggleOrderType("Express")}><FontAwesomeIcon icon={faChevronRight}/></div>
            </div>
            <div className='left-btns'>
                <button>Customize Order</button>
                <button>Express Order</button>
            </div>
        </div>
        <div className='left-right'>
            <h2>Order Status</h2>
            <div className='order-status'>
                Please Sign-in to see orders
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

export default Info
