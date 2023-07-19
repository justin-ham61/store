import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

const CustomerView = ({customerOrders, toggleCustomerView}) => {
    const navigateToOrder = (order_id) => {
        navigate('/Confirmation', {state:{orderNumber: order_id, origin: 'confirmation'}})
      }
    let navigate = useNavigate();

  return (
    <div className='order-section'>
        <div className='order-nav'>
            <h2>My Orders</h2>
            <FontAwesomeIcon icon={faXmarkCircle} onClick={() => toggleCustomerView(false)} className='clickable'/>
        </div>
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

export default CustomerView
