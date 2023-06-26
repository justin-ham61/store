import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { animation } from './hoc'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Items = () => {
    let navigate = useNavigate();
    const [ listItemsDry, setListItemsDry ] = useState([]);
    const [ listItemsLaundry, setListItemsLaundry ] = useState([]);

    //0 = dry, 1 = laundry, 2 = other
    const [ category, setCategory ] = useState(listItemsDry);
    const [ itemSelection, setItemSelection ] = useState({});
    const [ cart, setCart ] = useState({})
    const [ cartLength, setCartLength ] = useState(0)

    useEffect(() => {
        setListItemsDry([])
        setListItemsLaundry([])
        getItems();
    },[])

    useEffect(() => {
        setCategory(listItemsDry)
    },[listItemsDry])
    
    const toggleCategory = (x) => {
        console.log("clicked" + x);
        if (x === 'dry'){
            setCategory(listItemsDry)
        } else if (x === 'laundry'){
            setCategory(listItemsLaundry)
        }
    }

    const getItems = async () => {
        axios.get('/Admin/GetItems')
        .then(response => {
            let results = response.data.results;
            results.map((item) => {
                if (item.item_category === "dry"){
                    setListItemsDry(oldArray => [...oldArray, item])
                } else if (item.item_category === "laundry"){
                    setListItemsLaundry(oldArray => [...oldArray, item])
                }
            })
        })
    }

    const handleItemAdd = (name) => {
        console.log(name + ' clicked')
        if (!itemSelection[name]){
            setItemSelection({...itemSelection, [name]: 1})
        } else {
            let newCount = parseInt(itemSelection[name]) + 1;
            setItemSelection({...itemSelection, [name]: newCount})
        }
    }
    
    const handleItemRemove = (name) => {
        console.log(name + ' clicked')
        if (itemSelection[name] > 0){
            let newCount = parseInt(itemSelection[name]) - 1;
            setItemSelection({...itemSelection, [name]: newCount})
        }
    }

    const handleChange = (e) => {
        let newCount = parseInt(e.target.value);
        setItemSelection({...itemSelection, [e.target.name]: newCount})
        console.log(itemSelection)
    }

    const submitToCart = () => {
        setCart(itemSelection);
        alert('Items Added to Cart')
    }

    const clearCart = () => {
        setCart({})
        alert('Cleared Cart')
        window.location.reload();

    }

    useEffect(() => {
        const cookieCart = Cookies.get('cart');
        if (cookieCart) {
          setCartLength(Object.keys(cookieCart).length)
          setCart(JSON.parse(cookieCart))
          setItemSelection(JSON.parse(cookieCart))
        }
      }, []);
    
    useEffect(() => {
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
        setCartLength(Object.keys(cart).length)
    }, [cart]);

    const navigateToCart = () => {
        navigate('/Cart')
    }
  return (

    <div className='items-section'>
        <div className='item-nav'>
            <div className='item-selector'>
                <button className='item-section-btn' onClick={(e) => toggleCategory('dry')} id={category === listItemsDry ? 'active' : ''}>Dry Cleaning</button>
                <button className='item-section-btn' onClick={(e) => toggleCategory('laundry')} id={category === listItemsLaundry ? 'active' : ''}>Laundry</button>
            </div>
            <div className='cart-btns'>
                <span className='shopping-cart'>
                    {cartLength > 0 ? 
                    <FontAwesomeIcon icon={faCartShopping} beat size="xl" onClick={navigateToCart} className='pointer-cursor'/>
                    :
                    <FontAwesomeIcon icon={faCartShopping} size="xl"/>
                    }
                </span>
                <button className='item-section-btn' type='button' onClick={submitToCart}>{cartLength === 0 ? 'Add Items to Cart' : 'Update Cart'}</button>
                {cartLength > 0 ? 
                <button className='item-section-btn' type='button' onClick={clearCart}>Clear Cart</button>
                :
                null
                }
            </div>
        </div>
        <div className='item-wrapper'>
            <div className='items'>
                {category.map((item) => {
                    return (
                    <div className='item' key={item.item_id}>
                        <div>image</div>
                        <div className='item-info'>
                            <p>{item.item_name}</p>
                            <p>${item.item_price}</p>
                        </div>
                        <div className='item-count'>
                            <FontAwesomeIcon icon={faCircleMinus} className={item.item_name} onClick={() => handleItemRemove(item.item_name)}/>
                            <input key={item.item_id} name={item.item_name} type="number" value={itemSelection[item.item_name]} onChange={handleChange} placeholder='0' onWheel={(e) => e.target.blur()}/>
                            <FontAwesomeIcon icon={faCirclePlus} className={item.item_name} onClick={() => handleItemAdd(item.item_name)} />
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
        <div className='item-config-section'>

            <div className='add-item-row'>
                <button type='button'>Add Item</button>
            </div>
        </div>
    </div>
  )
}

export default animation(Items)