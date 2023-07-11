import axios from 'axios'
import { animate } from 'framer-motion'
import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminOrder from './AdminOrder'

const Admin = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemPrice:'',
        itemCategory:''
    })

    const [ listItems, setListItems ] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('/Auth/api/user')
        .then(response => {
            console.log(response.data.user.isAdmin)
            if (response.data.user.isAdmin != 1){
                navigate('/')
            } else if (response.data.user.isAdmin === 1){
                navigate('/Admin')
            }
        })
        .catch(error => {
            navigate('/')
            console.error('Error fetching user data:', error);
        })
    }, [])

    useEffect(() => {
        getItems();
    },[])
    
    const getItems = async () => {
        axios.get('/Admin/GetItems')
        .then(response => {
            setListItems(response.data.results);
        })
    }

    useEffect(() => {
        console.log(listItems)
    },[listItems])



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
      };

    const handleItemSubmit = async () => {
        axios.post('/Admin/AddItem', formData)
        .then(() => {
            alert('Item Successfully Added')
        })
        .catch((error) => {
            alert('unable to add item')
        })
    }

    const emailTest = () => {
        axios.get('/Auth/EmailTest')
        .then(response => {
            console.log(response.data)
        })
    }
  return (
    <div className='admin-section'>
        <AdminOrder/>
        <div className='items'>
            <form>
                <p>Add Items</p>
                <input type="text" name="itemName" id="" placeholder='item name' onChange={handleChange}/>
                <input type="number" name="itemPrice" id="" placeholder='item price' onChange={handleChange} />
                <select name="itemCategory" id="" onChange={handleChange} defaultValue="dry">
                    <option value="dry">dry</option>
                    <option value="laundry">laundry</option>
                    <option value="other">other</option>
                </select>
                <button type='button' onClick={handleItemSubmit}>Add Item</button>
            </form>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
                {listItems.map((item) => {
                    return (
                        <tr>
                            <td>{item.item_id}</td>
                            <td>{item.item_name}</td>
                            <td>{item.item_description}</td>
                            <td>{item.item_price}</td>
                            <td>{item.item_category}</td>
                        </tr>
                    )
                })}
            </table>
            <button type='button' onClick={getItems}>getItems</button>
            <p>{formData.itemCategory}</p>
        </div>
    </div>
  )
}

export default Admin