import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import OrderView from './OrderView'

const AdminOrder = () => {
    const [ orders, setOrders ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ orderId, setOrderId ] = useState(null)
    const [ userInfo, setUserInfo ] = useState(null)
    const [ overViews, setOverView ] = useState(false)

    useEffect(() => {
        axios.get('/Admin/GetOrders')
        .then(response => {
            setOrders(response.data.orderResults);
            setUsers(response.data.customerResults);
        })
    },[])

    const orderViews = (order, user) => {
        setOverView(true)
        setOrderId(order.order_id);
        setUserInfo(user)
    }

  return (
      <div className='admin-order-section'>
        {overViews ? 
        <OrderView onClick={setOverView} userInfo={userInfo}/>
        :
        null
        }
        <table>
            <tr>
                <th>Order Number</th>
                <th>Date</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Price</th>
            </tr>
            {orders.map((order, i) => {
                return(
                    <tr onClick={() => orderViews(order, users[i])}>
                        <td>{order.order_id}</td>
                        <td>{order.order_date}</td>
                        <td>{users[i].first_name}</td>
                        <td>{users[i].last_name}</td>
                        <td>{users[i].address}</td>
                        <td>{users[i].city}</td>
                        <td>{users[i].state}</td>
                        <td>{users[i].zip}</td>
                        <td>${(order.total_cost).toFixed(2)}</td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default AdminOrder
