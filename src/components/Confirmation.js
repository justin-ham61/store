
import React, {useState, useEffect} from 'react'
import { animation } from './hoc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import Tos from './Tos'
import axios from 'axios'
import Cookies from "js-cookie";


const Confirmation = () => {

    const [items, setItems] = useState([])
    const [user, setUser] = useState({})
    const {state} = useLocation();
    const [data, setData] = useState({
        number: 0
    })
    const [total, setTotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [type, setType] = useState('')

    useEffect(()=> {
        setData(prevData => ({...prevData, number: state.orderNumber}))
        setType(state.origin)
    },[state])

    useEffect(()=> {
        console.log(data)
        if(data.number != 0){
            console.log(data.number)
            axios.post(`/Order/OrderItems/${type}`, data)
            .then(response => {
                setItems(response.data.item);
                setUser(response.data.user);
            })
            .catch(error => {
                alert("There was an error")
            })
        }
    },[data])

    useEffect(() => {
        let currentTotal = 0;
        items.map((item) => {
            let itemCost = (item.quantity * item.price);
            currentTotal = currentTotal + itemCost;
        })
        if (currentTotal < 50){
            setDeliveryFee(5)
        } else {
            setDeliveryFee(0)
        }
        setTotal(currentTotal)
    }, [items])


  return (
    <div className='confirmation-page'>
        <div className="confirmation-header">
            <h2>Order Confirmation for #{data.number}</h2>
            <p>Thank you for placing and order!</p>
            <p>You'll soon receive an email regarding order instructions</p>
        </div>
        <div className="buffer"></div>
        <h2>Order Summary</h2>
        <div className="confirmation-order-summary">
            <table>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th className='align-right'>Total</th>
                </tr>
            {items.map((item) => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>x{item.quantity}</td>
                        <td>${item.price}</td>
                        <td className='align-right'>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                )
            })}
            {total < 50 ? 
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
                    <td className='total'>Total: </td>
                    <td></td>
                    <td></td>
                    <td className='align-right total'>${(total + deliveryFee).toFixed(2)}</td>
                </tr>
            </table>
        </div>
        <div className="confirmation-customer-summary">
            <h2>Customer Information</h2>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.address}</p>
            <p>{user.city} {user.state}, {user.zip}</p>
            <p>{user.email}</p>
            <p>{user.phone_number}</p>
        </div>
        <div className="buffer"></div>
        <div className="confirmation-footer">
            <p>Contact Us</p>
            <h2>Thank You!</h2>
        </div>

    </div>
  )
}

export default animation(Confirmation);
