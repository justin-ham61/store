import React from 'react'
import { animation } from './hoc'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Cart = () => {
    let navigate = useNavigate();

    const [cart, setCart] = useState({});
    const [keys, setKeys] = useState([]);
    const [ pricing, setPricing ] = useState({})
    const [ cartTotal, setCartTotal ] = useState(0)
    const [ deliveryFee, setDeliveryFee ] = useState(0)
    
    const getItems = async () => {
        axios.get('/Admin/GetItems')
        .then(response => {
            let results = response.data.results;
            console.log(results)
            let tempItems = {}
            results.map((item) => {
                tempItems[item.item_name] = item.item_price
            })
            setPricing(tempItems);
        })
    }

    const handleSubmit = async () => {
        let authResult = await checkAuth();
        console.log(authResult)
        if(authResult){
            navigate('/Checkout')
        } else {
            navigate('/Register')
        }
    }

    const checkAuth = () => {
        return new Promise((resolve, reject) => {
            axios.get('Auth/api/user')
            .then(response => {
                console.log(response.data.user)
                if(response){
                    resolve(true);
                }
            })
            .catch(error => {
                alert('Please Sign-in to place order')
                resolve(false);
            })
        })
    }

    const navigateToCart = () => {
        navigate('/Items')
    }

    useEffect(() => {
        console.log(pricing)
    },[pricing])


    useEffect(() => {
        getItems();
    },[])

    useEffect(() => {
        const cookieCart = Cookies.get('cart');
        if (cookieCart) {
          setCart(JSON.parse(cookieCart))
        }
      }, []);

      useEffect(() => {
        setKeys(Object.keys(cart));
      },[cart])

      useEffect(() => {
        console.log('hello')
        let totalAmount = 0;
        keys.forEach((key) => {
            totalAmount += (pricing[key] * cart[key]);
        })
        parseInt(totalAmount)
        if(totalAmount < 50){
            setDeliveryFee(5)
        }
        totalAmount.toFixed(2)
        setCartTotal(totalAmount);
      },[pricing])

  return (
    <div className='cart-section'>
        <h2>Cart</h2>
        <div className='table-container'>
            <table className='cart-table'>
                <tr>
                    <th style={{width: 10}}>Item</th>
                    <th style={{width: 10}}>Item Price</th>
                    <th style={{width: 40}}>Quantity</th>
                    <th style={{width: 40}} className='align-right'>Total Price</th>
                </tr>
                {keys.map((key, i) => {
                    if(cart[key] > 0) {
                        return(
                            <tr>
                                <td>{key}</td>
                                <td>${pricing[key]}</td>
                                <td>x{cart[key]}</td>
                                <td className='align-right'>${(pricing[key] * cart[key]).toFixed(2)}</td>
                            </tr>
                        )
                    }
                })}
                {cartTotal < 50 ? 
                    <tr>
                        <td>Delivery Fee</td>
                        <td></td>
                        <td></td>
                        <td className='align-right'>$5.00</td>
                    </tr>
                    :
                    null
                }
                <tr>
                    <td className='bold'>Total</td>
                    <td></td>
                    <td></td>
                    <td className='align-right total'>${(cartTotal + deliveryFee).toFixed(2)}</td>
                </tr>
            </table>
        </div>
        <div>
            <p onClick={navigateToCart}>Return to order configurator to edit items</p>
        </div>
        <button onClick={handleSubmit}>Review Address</button>
    </div>
  )
}

export default animation(Cart)
