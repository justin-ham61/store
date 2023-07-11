import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Items from './Items'

const ItemAddPanel = ({orderId, getOrderDetails, toggleItemAddPanel, getOrder}) => {
    const [listItems, setListItems] = useState([])
    const [itemSelection, setItemSelection] = useState({
        itemId: null, 
        itemPrice: 0,
        quantity: 0
    })

    useEffect(() => {
        getItems();
    },[])

    useEffect(() => {
        console.log(itemSelection)
    },[itemSelection])

    const getItems = () => {
        axios.get('/Admin/GetItems')
        .then(response => {
            let results = response.data.results;
            results.map((item) => {
                setListItems(oldArray => [...oldArray, item])
            })
        })
    }

    const handleChange = (e) => {
        setItemSelection({...itemSelection, quantity: e.target.value})
    }

    const itemChoice = (e) => {
        const values = e.target.value.split(",")
        setItemSelection({...itemSelection, itemId: values[0], itemPrice: values[1]})
    }
    
    const addItemToOrder = () => {
        if(itemSelection.itemId != null && itemSelection.quantity > 0){
            axios.post(`/Order/UpdateOrderItem/${orderId}`, itemSelection)
            .then(response => {
                getOrderDetails();
                getOrder();
                toggleItemAddPanel(false)
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            alert('Select Item and Quantity')
        }
    }

  return (
      <tr>
        <td>
        <select name="" id="" onChange={itemChoice}>
            {listItems.map((item) => {
                return(
                    <option key={item.item_id} value={`${item.item_id},${item.item_price}`}>{item.item_name}</option>
                )
            })}
        </select>
        </td>
        <td>
            <input type="number" name="" id="" placeholder='Quantity' onChange={handleChange}/>
        </td>
        <td></td>
        <td><button className='add-item-button' type='button' onClick={addItemToOrder}>Add Item</button></td>
        <td><button className='delete-item-button' type='button'><FontAwesomeIcon icon={faXmark} onClick={() => toggleItemAddPanel(false)}/></button></td>
    </tr>
  )
}

export default ItemAddPanel
