import React from 'react'
import { animation } from './hoc'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Account = () => {

  const [user, setUser] = useState({});

  const getUserInfo = () => {
    axios.get('/Auth/api/user')
    .then(response => {
      setUser(response.data.user)
    })
  }

  const divideUserInfo = (user) => {
    let categories = {
      'First Name': [],
      'Last Name': [],
      'Email': [],
      'Phone': [],
      'Address': [],
      'City': [],
      'State': [],
      'Zip': [],
    }
  }

  const updateUserInfo = (fieldType) => {
    let body = {
      data: '',
      type: ''
    }
    body.data = window.prompt("Please enter new information");
    if (body.data){
      body.type = fieldType
      axios.post('/Auth/UpdateData', body)
      .then(response => {
        if(response.data === 'Success'){
          alert("Successfully Updated Personal Information")
          window.location.reload(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    getUserInfo();
  },[])
  return (
    <div className='account-section'>
        <h2>My Account</h2>
        <div className='account-info-container'>
        <div>
          <h3>First Name <FontAwesomeIcon icon={faPenToSquare} size="xs" onClick={() => updateUserInfo('first_name')} className='clickable'/></h3>
          <p>{user.first_name}</p>
        </div>
        <div>
          <h3>Last Name <FontAwesomeIcon icon={faPenToSquare} size="xs" onClick={() => updateUserInfo('last_name')} className='clickable'/></h3>
          <p>{user.last_name}</p>
        </div>
        <div>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Phone Number</h3>
          <p>{user.phone_number}</p>
        </div>
        <div>
          <h3>Street Address <FontAwesomeIcon icon={faPenToSquare} size="xs" onClick={() => updateUserInfo('address')} className='clickable'/></h3>
          <p>{user.address}</p>
        </div>
        <div>
          <h3>City <FontAwesomeIcon icon={faPenToSquare} size="xs" onClick={() => updateUserInfo('city')} className='clickable'/></h3>
          <p>{user.city}</p>
        </div>
        <div>
          <h3>State <FontAwesomeIcon icon={faPenToSquare} size="xs" onClick={() => updateUserInfo('state')} className='clickable'/></h3>
          <p>{user.state}</p>
        </div>
        <div>
          <h3>Zip Code <FontAwesomeIcon icon={faPenToSquare} size="xs" onClick={() => updateUserInfo('zip')} className='clickable'/></h3>
          <p>{user.zip}</p>
        </div>
        </div>
    </div>
  )
}

export default animation(Account)
