import React from 'react'
import { animation } from './hoc'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const [user, setUser] = useState();

  const getUserInfo = () => {
    axios.get('/Auth/api/user')
    .then(response => {
      setUser(response.data.user)
    })
  }

  useEffect(() => {
    getUserInfo();
  },[])
  return (
    <div className='account-section'>
        <h2>My Account</h2>
    </div>
  )
}

export default animation(Account)
