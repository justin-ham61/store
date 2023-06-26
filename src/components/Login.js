import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { animation } from './hoc'

const Login = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    axios.post('/Auth/Login', formData)
    .then((response) => {
      if (response.data.message === "Authentication successful") {
        navigate('/')
        window.location.reload();
        // update your application's state and redirect the user
      } else {
        navigate('/Login')
        alert(response.data)
        // display an error message
      }
    })
    .catch(error => {
      alert(error)
      console.error('Error:', error);
    });
  }

  return (
    <div className='login-section'>
        <div className='login-box'>
            <h2>Sign In</h2>
            <div className='login-content'>
                <form>
                    <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
                    <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
                    <button type='button' onClick={(handleSubmit)}>Sign In</button>
                </form>
                <Link to="/Register">Don't have an account? Create one!</Link>
            </div>
        </div>
    </div>
  )
}

export default animation(Login)
