import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { animation } from './hoc'
import axios from 'axios'

const Register = () => {
    let navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zip:'',
      password:'',
      passwordConfirmation: ''
    });
    

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let emailVal = await checkEmail(formData);
        let phoneNumber = await checkPhone(formData);
        if (emailVal === true){
            alert('Email Already Exists')
        }
        if (phoneNumber === true){
            alert('Phone Number Already Exists')
        }
        if (formData.password != formData.passwordConfirmation){
            alert('Password Does not Match')
        }
        if (emailVal === false && formData.password === formData.passwordConfirmation && phoneNumber === false){
            registerCustomer();
        }
    }

  const registerCustomer = async () => {
    if (formData.password == formData.passwordConfirmation){
        axios.post('/Auth/Register', formData)
        .then((response) => {
            (response.data ? navigate('/Login') : console.log('error while registering'))
            alert('Successfully Registered')
        })
        .catch((error) => {
            setStatus(error)
        })
    } else {
        alert("Password does not match")
    }
  }

  const checkEmail = (formData) => {
    return new Promise((resolve, reject) => {
        axios.post('/Auth/EmailCheck', formData)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
        })
    })
  }
  const checkPhone = (formData) => {
    return new Promise((resolve, reject) => {
        axios.post('/Auth/PhoneCheck', formData)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
        })
    })
  }



  return (
    <div className='register-section'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='input-section'>
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstName" id="" placeholder='Ex. John' onChange={handleChange} required/>
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" id="" placeholder='Ex. Doe' onChange={handleChange} required/>
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="" placeholder='example@example.com' onChange={handleChange} required/>
                        <label htmlFor="">Phone Number</label>
                        <input type="text" name="phoneNumber" id="" placeholder='5551234567' onChange={handleChange} required/>
                        <label htmlFor="">Street Address</label>
                        <input type="text" name="address" id="" placeholder='555 N Holden St' onChange={handleChange} required/>
                    </div>
                    <div className='input-section'>   
                        <label htmlFor="">City</label>
                        <input type="text" name="city" id="" placeholder='Ex. San Jose' onChange={handleChange} required/>
                        <label htmlFor="">State</label>
                        <input type="text" name="state" id="" placeholder='Ex. CA' onChange={handleChange} required maxLength={2}/>
                        <label htmlFor="">Zip</label>
                        <input type="text" name="zip" id="" placeholder='Zip Code' onChange={handleChange} required maxLength={5}/>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="" placeholder='Password' onChange={handleChange} required minLength={8}/>
                        <label htmlFor="">Password Confirmation</label>
                        <input type="password" name="passwordConfirmation" id="" placeholder='Re-enter Password' onChange={handleChange} required minLength={8}/>
                    </div>
                </div>
                <button type='submit'> Register</button>   
            </form>
                <Link to="/Login">Already have an account? Log In!</Link>
    </div>
  )
}


export default animation(Register)
