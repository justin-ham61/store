import React from 'react'
import { animation } from './hoc'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckoutConfirm from './CheckoutConfirm';
import { AnimatePresence } from 'framer-motion';


const Checkout = () => {
    const [user, setUser] = useState({});
    const [showOrderConfirmation, toggleShowOrderConfirmation] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        getUserData();
    },[])

    const getUserData = () => {
        axios.get('/Auth/api/user')
        .then(response => {
            console.log(response.data.user)
            setUser(response.data.user)
        })
        .catch(error => {
            console.log('not logged in')
        })
    }

    const goToAccount = () => {
        navigate('/Account')
    }

    const goToCart = () => {
        navigate('/Cart')
    }


        return (
    <div className='checkout-section'>
        <AnimatePresence mode="wait">
            {showOrderConfirmation ? 
                <CheckoutConfirm onClick={toggleShowOrderConfirmation}/>
                :
                null
            }
        </AnimatePresence>
        <div>
            <h2>Hey, {user.first_name}!</h2>
            <p>Please review the following information to ensure the best experience</p>
        </div>
        <div className='customer-info'>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Street Address: {user.address}</p>
            <p>City: {user.city}</p>
            <p>State: {user.state}</p>
            <p>Zip: {user.zip}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phone_number}</p>
        </div>
        <div className='customer-edit'>
            <p onClick={goToAccount}>Edit Personal Information</p>
        </div>
        <div className='button-section'>
            <button onClick={goToCart}>Go Back to Cart</button>
            <button onClick={() => toggleShowOrderConfirmation(true)}>Place Order</button>
        </div>
    </div>
  )
}

export default animation(Checkout)
