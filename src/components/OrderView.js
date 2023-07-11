import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ItemAddPanel from './ItemAddPanel'

const OrderView = ({onClick, userInfo}) => {
  const [ orderDetail, setOrderDetail ] = useState([])
  const [ order, setOrder ] = useState({
    total_cost: 0
  })
  const [ data, setData ] = useState({
    number: 0
  })
  const [ orderStatus, setOrderStatus ] = useState({orderStatus: userInfo.order_status})
  const [ paymentStatus, setPaymentStatus ] = useState({paymentStatus: userInfo.payment_status})
  const [ itemAddPanel, toggleItemAddPanel ] = useState(false)

  useEffect(()=> {
    setData(prevData => ({...prevData, number: userInfo.order_id}))
    console.log(userInfo)
    console.log(orderStatus)
  },[])

  useEffect(() => {
    getOrderDetails(userInfo.order_id);
    getOrder(userInfo.order_id)
  },[data])

  const getOrderDetails = () => {
    console.log('hello from order details')
    axios.post('/Order/OrderItems/Admin', data)
    .then(response => {
      setOrderDetail(response.data.item);
      console.log(response.data.item)
    })
  }

  const getOrder = () => {
    axios.get(`/Order/GetOrderByOrderId/${userInfo.order_id}`)
    .then(response => {
      setOrder(response.data)
    })
  }

  const updateOrderStatus = (e) => {
    const value = e.target.value;
    setOrderStatus({orderStatus: value})
    console.log(value)
  }

  const updatePaymentStatus = (e) => {
    const value = e.target.value;
    setPaymentStatus({paymentStatus: value})
    console.log(value)
  }

  const submitOrderStatusChange = () => {
    axios.post(`/Order/UpdateOrderStatus/${userInfo.order_id}`, orderStatus)
    .then(response => {
      if(response.data === true){
        getOrder();
      }
    })
    .catch(error => {
      alert(error)
    })
  }

  const submitPaymentStatusChange = () => {
    axios.post(`/Order/UpdatePaymentStatus/${userInfo.order_id}`, paymentStatus)
    .then(response => {
      if(response.data === true){
        getOrder();
      }
    })
    .catch(error => {
      alert(error)
    })
  }

  const deleteItem = (item) => {
    axios.post('/Order/DeleteItem', item)
    .then(response => {
      if(response.data){
        getOrderDetails();
        getOrder();
      }
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <div className='order-view-section'>
      <div className='over-view-main'>
        <div className='over-view-header'>
          <h2>Order #{userInfo.order_id}</h2>
          <FontAwesomeIcon icon={faCircleXmark} size='xl' className='clickable' onClick={()=>onClick(false)}/>
        </div>
        <div className='over-view-body'>
          <div className='body-section'>
            <div className='order-summary'>
              <h2>Order Summary</h2>
              <table>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                {orderDetail.map((item, i) => {
                  if(item.quantity > 0){

                    return(
                      <tr key={i}>
                      <td>{item.name}</td>
                      <td>x{item.quantity}</td>
                      <td>${(item.price).toFixed(2)}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td><button className='delete-item-button' type='button'><FontAwesomeIcon icon={faXmark} onClick={() => deleteItem(item)}/></button></td>
                    </tr>
                  )
                }
                })}
                {itemAddPanel ? 
                  <ItemAddPanel orderId={userInfo.order_id} getOrderDetails={getOrderDetails} toggleItemAddPanel={toggleItemAddPanel} getOrder={getOrder}/>
                :
                  null
                }
                {userInfo.total_cost < 50 ? 
                <tr>
                  <td>Delivery Fee</td>
                  <td></td>
                  <td></td>
                  <td>$5.00</td>
                </tr>
                : 
                null
                }
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  {order.total_cost < 50 ? 
                  <td>${(order.total_cost + 5).toFixed(2)}</td>
                  :
                  <td>${(order.total_cost).toFixed(2)}</td>
                  }
                </tr>
              </table>
            </div>           
            <button type='button' onClick={() => toggleItemAddPanel(true)}>Add item to Express</button>



            <div>
              <h2>Customer Information</h2>
              <p>{userInfo.first_name} {userInfo.last_name}</p>
              <p>{userInfo.address}</p>
              <p>{userInfo.city} {userInfo.state}, {userInfo.zip}</p>
              <p>{userInfo.email}</p>
              <p>{userInfo.phone_number}</p>
            </div>
          </div>




          <div className='body-section'>
            <div>
              <h2>Order Editor</h2>
              <p>Current Order Status: <span className='bold'>{order.order_status}</span></p>
              <form className='order-update-form'>
                <select name="status" id="" onChange={updateOrderStatus}>
                  <option value="Pending Pick Up">Pending Pick Up</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting for Delivery">Waiting for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button type='button' onClick={submitOrderStatusChange}>Submit Changes</button>
              </form>
            </div>
            <div>
              <h2>Payment Editor</h2>
              <p>Current Payment Status: <span className='bold'>{order.payment_status}</span></p>
                <form className='order-update-form'>
                  <select name="" id="" onChange={updatePaymentStatus}>
                    <option value="unpaid">unpaid</option>
                    <option value="paid">paid</option>
                  </select>
                  <button type='button' onClick={submitPaymentStatusChange}>Submit Changes</button>
                </form>
            </div>
            <h2>Message Customer</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderView
