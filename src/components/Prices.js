import React from 'react'
import { animation } from './hoc'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';

const Prices = () => {

  const tops = [
    {
        name: 'Shirt (D)',
        price: 7.75
    },
    {
        name: 'Shirt (L)',
        price: 3.50
    },
    {
        name: 'Jacket/Blazer',
        price: 13.95
    },
    {
        name: 'Blouse',
        price: 7.75
    },
    {
        name: 'Vest',
        price: 7.25
    },
    {
        name: 'Sweater',
        price: 7.75
    },
    {
        name: 'Jerseys',
        price: 9.75
    }
  ]
  const bottoms = [
    {
        name: 'Pants',
        price: 7.75
    },
    {
        name: 'Skirt',
        price: 7.75
    },
    {
        name: 'Shorts',
        price: 7.75
    }
  ]
  const fullbody = [
    {
        name: '2 Piece Suit',
        price: 20.75
    },
    {
        name: '3 Piece Suit',
        price: 24.95
    },
    {
        name: 'Casual Dress',
        price: 15
    },
    {
        name: 'Formal Dress',
        price: 20
    },
    {
        name: '2 Piece Uniform',
        price: 14.75
    },
    {
        name: 'Gown/Robes',
        price: 14.75
    },
    {
        name: 'Lab Coat',
        price: 8.75
    }
  ]
  const household = [
    {
        name: 'Blanket',
        price: 22
    },
    {
        name: 'Pillow',
        price: 14
    }, 
    {
        name: 'Pillow Cover',
        price: 7
    },
    {
        name: 'Comforter',
        price: 39
    },
    {
        name: 'Table Cover',
        price: 22
    }
  ]
  const accessory = [
    {
        name: 'Tie',
        price: 6.25
    },
    {
        name: 'Hat',
        price: 7.25
    },
    {
        name: 'Belt',
        price: 2.5
    }, 
    {
        name: 'Scarf',
        price: 7.25
    },
  ]

  return (
    <div className='prices-section'>
      <div className='category'>
        <h2>Tops</h2>
        <table>
            {tops.map((top) => {
                return(
                    <tr>
                        <td>{top.name}</td>
                        <td>${top.price}</td>
                    </tr>
                )
            })}
        </table>
      </div>
      <div className='category'>
        <h2>Bottoms</h2>
        <table>
        {bottoms.map((bottom) => {
                return(
                    <tr>
                        <td>{bottom.name}</td>
                        <td>${bottom.price}</td>
                    </tr>
                )
            })}
        </table>
      </div>
      <div className='category'>
        <h2>Full Body</h2>
        <table>
        {fullbody.map((item) => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                    </tr>
                )
            })}
        </table>
      </div>
      <div className='category'>
        <h2>Household</h2>
        <table>
        {household.map((item) => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                    </tr>
                )
            })}
        </table>
      </div>
      <div className='category'>
        <h2>Accessory</h2>
        <table>
        {accessory.map((item) => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                    </tr>
                )
            })}
        </table>
      </div>
      <div className='category'>
        <h2>Others</h2>
        <div>

        </div>
      </div>
    </div>
  )
}

export default animation(Prices)
