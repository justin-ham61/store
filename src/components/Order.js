import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { animation } from './hoc'
import { useNavigate } from 'react-router-dom'

const Order = () => {
  const [ customerOrders, setCustomerOrders ] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('Order/GetOrders')
    .then(response => {
      console.log(response.data)
      setCustomerOrders(response.data)
    })
  },[])

  const navigateToOrder = (order_id) => {
    navigate('/Confirmation', {state:{orderNumber: order_id, origin: 'confirmation'}})
  }
  return (
    <div className='order-section'>
      <h2>My Orders</h2>
      <div className="buffer"></div>
      <div className='table-wrapper'>
        <table>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Fullfillment Status</th>
            <th>Payment Status</th>
            <th className='align-right'>Total</th>
          </tr>
          {customerOrders.map((order) => {
            return(
              <tr onClick={() => navigateToOrder(order.order_id)}>
                <td># {order.order_id}</td>
                <td>{order.order_date}</td>
                <td>{order.order_status}</td>
                <td>{order.payment_status}</td>
                <td className='align-right'>${(order.total_cost).toFixed(2)}</td>
              </tr>
            )
          })}
         </table>
        </div>
    </div>
  )
}

export default animation(Order)
