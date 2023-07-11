import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Tos from './Tos'
import axios from 'axios'
import Cookies from "js-cookie";

const inputTransition = {
    type: 'tween',
    ease: 'linear',
    duration: .1,
  }


const CheckoutConfirm = ({onClick}) => {
    let navigate = useNavigate();
    const [isChecked, toggleIsChecked] = useState(false)
    const [tos, toggleTos] = useState(false)
    const [cart, setCart] = useState({})

    const [orderData, setOrderData] = useState({
        checked: false,
        items: {},
    })

    const inputVariant = {
        initial: {
          opacity: 0
        },
        in: {
          opacity: 1
        }, 
        out: {
          opacity: 0
        }
      }

      useEffect(() => {
        const cookieCart = Cookies.get('cart');
        if (cookieCart) {
          const cart = JSON.parse(cookieCart);
          setCart(cart)
        }
      }, []);

    useEffect(() => {
        toggleTos(false)
    },[])

    useEffect(() => {
        setOrderData(prevData => ({...prevData, items: cart}))
    },[cart])

    //Erase after testing
    useEffect(() => {
        console.log(orderData)
    },[orderData])

    const handleCheckboxChange = (event) => {
        toggleIsChecked(event.target.checked);
        let status = event.target.checked;
        setOrderData(prevData => ({...prevData, checked: status}));
    };

    useEffect(() => {
        setOrderData(prevData => ({...prevData, checked: isChecked}));
        console.log(orderData)
    }, [isChecked])

    const handleButtonClick = () => {
        if (isChecked) {
            submitOrder();
        // Here is where you put your code to execute if the checkbox is checked
        } else {
        alert('Please Accept the Terms and Agreement');
        }
    };

    const submitOrder = () => {
        axios.post('Order/AddOrder', orderData)
        .then(response => {
            if(response.data.message == 'success'){
                console.log(response.data.orderNumber.order_id)
                Cookies.remove('cart');
                navigate('/Confirmation', {state:{orderNumber: response.data.orderNumber.order_id, origin: 'checkout'}})
            }
        })
        .catch(error => {
            alert("There was an error, please retry")
            console.log(error);
        })
    }


  return (
    <motion.div className='checkout-background'
    initial="initial"
    animate="in"
    exit="out"
    variants={inputVariant}
    transition={inputTransition}
    >
        {!tos ? 
        <div className='checkout-confirm-container'>
                <div className='checkout-confirm-header'>
                    <h2>Confirmation</h2>
                    <FontAwesomeIcon icon={faCircleXmark} size='xl' onClick={() => onClick(false)} className='clickable'/>
                </div>
                <div className='checkout-confirm-body'>
                    <p>Do all your information look correct?</p>
                    <p onClick={() => toggleTos(true)} className='tos-text'>Please read and accept the Terms and Agreement</p>
                    <p onClick={() => toggleIsChecked(true)}><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/> I Accept</p>
                    <button className='clickable' type='button' onClick={handleButtonClick}>Place Order</button>
                </div>
        </div>
        :
        <Tos
            onClick={toggleTos}
        />
        }
    </motion.div>
  )
}

export default CheckoutConfirm
