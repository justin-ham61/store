import React from 'react'
import { dryPrices } from './consts/prices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';


const Items = () => {
  return (

    <div className='items-section'>
        <div className='item-nav'>
            <div className='item-selector'>
                <button className='item-section-btn'>Dry Cleaning</button>
                <button className='item-section-btn'>Laundry</button>
            </div>
            <button className='item-section-btn'>Confirm</button>
        </div>
        <div className='item-wrapper'>
            <div className='items'>
                { dryPrices.map((item, i) => (
                    <div className='item' key={i}>
                        <div>image</div>
                        <div className='item-info'>
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                        </div>
                        <div className='item-count'>
                            <FontAwesomeIcon icon={faCircleMinus} />
                            <input type="number"/>
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Items
