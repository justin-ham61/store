import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomerView from './CustomerView'

const AdminCustomers = () => {
    const [ customers, setCustomers ] = useState([])
    const [ searchField, setSearchField ] = useState('')
    const [ orders, setOrders ] = useState([])
    const [ customerView, toggleCustomerView ] = useState(false)
    useEffect(() => {
        axios.get('/Admin/GetCustomers')
        .then(response => {
            console.log(response.data)
            setCustomers(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const handleChange = (e) => {
        setSearchField(e.target.value)
    }

    const filteredCustomers = customers.filter(
        customer => {
            return(
                customer.first_name.toLowerCase().includes(searchField.toLowerCase()) || customer.last_name.toLowerCase().includes(searchField.toLowerCase()) || customer.phone_number.includes(searchField)
            )
        }
    )

    const customerOrders = (customer_id) => {
        axios.get(`/Admin/GetCustomerOrders/${customer_id}`)
        .then(response => {
            console.log(response.data)
            toggleCustomerView(true)
            setOrders(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
    
  return (
    <div className='admin-customers-section'>
        <div className='search-bar'>
            <label htmlFor="search">Search Customers</label>
            <input name='search' type="text" onChange={handleChange}/>
        </div>
        {customerView ? 
        <CustomerView customerOrders={orders} toggleCustomerView={toggleCustomerView}/>
        :
        null
        }   
        <table className='admin-table'>
            <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Zip</th>
            </tr>
            {filteredCustomers.map((customer, i) => {
                return(
                    <tr onClick={() => customerOrders(customer.customer_id)}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone_number}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.zip}</td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default AdminCustomers
