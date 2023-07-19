import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons';
import { animation } from './hoc'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import 'font-awesome/css/font-awesome.min.css';


const Items = () => {
    let navigate = useNavigate();
    const [ listItems, setListItems ] = useState([]);

    //0 = dry, 1 = laundry, 2 = other
    const [ category, setCategory ] = useState({
        'Tops': [],
        'Bottoms': [],
        'Fullbody': [],
        'Accessories': [],
        'Households': [],
        'Others': []
    });
    const [ filteredCategory, setFilteredCategory ] = useState({})
    const [ itemSelection, setItemSelection ] = useState({});
    const [ cart, setCart ] = useState({});
    const [ cartLength, setCartLength ] = useState(0);
    const [ takeToCart, setTakeToCart] = useState(false)
    const [ searchField, setSearchField ] = useState('')
    
    const categorizeItems = (items) => {
        let categories = {
            'Tops': [],
            'Bottoms': [],
            'Fullbody': [],
            'Accessories': [],
            'Households': [],
            'Others': []
        }
        listItems.map((item) => {
            if (item.category === 'Tops'){
                categories.Tops.push(item)
            } else if (item.category === 'Bottoms'){
                categories.Bottoms.push(item)
            } else if (item.category === 'Full Body'){
                categories.Fullbody.push(item)
            } else if (item.category === 'Accessories'){
                categories.Accessories.push(item)
            } else if (item.category === 'Households'){
                categories.Households.push(item)
            } else if (item.category === 'Others'){
                categories.Others.push(item)
            }
        })
        return categories
    }
    
    useEffect(() => {
        setListItems([])
        getItems();
    },[])

    const handleSearchChange = (e) => {
        setSearchField(e.target.value)
    }

    useEffect(() => {
        const filteredArrayTops = category.Tops.filter(
            item => {
                return(
                    item.item_name.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
        const filteredArrayBottoms = category.Bottoms.filter(
            item => {
                return(
                    item.item_name.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
        const filteredArrayFullbody = category.Fullbody.filter(
            item => {
                return(
                    item.item_name.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
        const filteredArrayAccessories = category.Accessories.filter(
            item => {
                return(
                    item.item_name.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
        const filteredArrayHouseholds = category.Households.filter(
            item => {
                return(
                    item.item_name.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
        const filteredArrayOthers = category.Others.filter(
            item => {
                return(
                    item.item_name.toLowerCase().includes(searchField.toLowerCase())
                )
            }
        )
        console.log(filteredArrayTops)
        setFilteredCategory({...filteredCategory, 
            'Tops': filteredArrayTops, 
            'Bottoms': filteredArrayBottoms,
            'Fullbody': filteredArrayFullbody,
            'Accessories': filteredArrayAccessories,
            'Households': filteredArrayHouseholds,
            'Others': filteredArrayOthers
        })
    },[searchField])

    useEffect(() => {
        const categorizedItems = categorizeItems(listItems);
        setCategory(categorizedItems)
        setFilteredCategory(categorizedItems)
    }, [listItems])


    const getItems = async () => {
        axios.get('/Admin/GetItems')
        .then(response => {
            let results = response.data.results;
            results.map((item) => {
                setListItems(oldArray => [...oldArray, item])
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
        if(window.confirm('Items successfully added to cart \nWould you like to proceed to checkout?')){
            setTakeToCart(true)
        } else {
            return;
        }
    }

    useEffect(() => {
        if(takeToCart === true){
            navigate('/Cart')
        }
    },[takeToCart])

    const clearCart = () => {
        setCart({})
        alert('Cleared Cart')
        setItemSelection({})
        setListItems([]);
        getItems();
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
                <div className='item-section-btn-container'>
                    <button className='item-section-btn' type='button' onClick={submitToCart}>{cartLength === 0 ? 'Add Selection to Cart' : 'Update Cart'}</button>
                    {cartLength > 0 ? 
                    <button id='red' className='item-section-btn' type='button' onClick={clearCart}>Clear Cart</button>
                    :
                    null
                    }
                </div>
                <div className='shopping-cart pointer-cursor' onClick={navigateToCart}>
                    <p>Cart</p>
                    {cartLength > 0 ? 
                    <FontAwesomeIcon icon={faCartShopping} beat size="xl" onClick={navigateToCart} className='pointer-cursor'/>
                    :
                    <FontAwesomeIcon icon={faCartShopping} size="xl" onClick={navigateToCart} className='pointer-cursor'/>
                    }
                </div>
        </div>
        <div className='item-search-bar'>
            <input type="search" name="item-search" id="" onChange={handleSearchChange} placeholder="Search for Items "/>
        </div>
        <div className='item-wrapper'>
            <div className='items'>
                {Object.entries(filteredCategory).map(([i, x]) => {
                    return (
                    <div key={i} className={x.length === 0 ? 'none' : 'item-category-box'}>
                        <h2 className='category-header'>{i.toUpperCase()}</h2>
                        {x.map((item, index) => {
                            return(
                            <div className='item' key={item.item_id}>
                                <div className='item-info'>
                                    <p className='.prevent-select'>{item.item_name} - ${item.item_price}</p>
                                </div>
                                <div className='item-count'>
                                    <FontAwesomeIcon icon={faCircleMinus} className={item.item_name} onClick={() => handleItemRemove(item.item_name)} id='subtract'/>
                                    <input key={item.item_id} name={item.item_name} type="number" value={itemSelection[item.item_name]} onChange={handleChange} placeholder='0' onWheel={(e) => e.target.blur()}/>
                                    <FontAwesomeIcon icon={faCirclePlus} className={item.item_name} onClick={() => handleItemAdd(item.item_name)} id='add'/>
                                </div>
                            </div> 
                                )
                        })}
                    </div>
                    )
                })}
            </div>
        </div>
        <div className='items-bottom'>
            <button className='item-section-btn' type='button' onClick={submitToCart}>{cartLength === 0 ? 'Add Selection to Cart' : 'Update Cart'}</button>
            {cartLength > 0 ? 
            <button id='red' className='item-section-btn' type='button' onClick={clearCart}>Clear Cart</button>
            :
            null
            }
        </div>
    </div>
  )
}

export default animation(Items)
