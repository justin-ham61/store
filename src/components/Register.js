import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import InputField from './InputField';
import { animation } from './hoc'
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'

const Register = () => {
    let navigate = useNavigate();
    const [button, setButton] = useState(1)
    const [status, setStatus] = useState('');
    const [step, setStep] = useState(1);
    const [passwordForm, setPasswordForm] = useState(false)
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
    
    let filled = false

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  
    const handleNext = (e) => {
      setButton(1)
      let currentField = inputFields[step - 1].name;
      let value = formData[currentField]
      console.log(value.length)
      if (value.length > 0){
        setStep(step + 1)
      }
    };

    const handlePrevious = (e) => {
        setButton(0)
        if (step > 1){
            setStep(step-1)
        }
    }
  
  const inputFields = [
    { label: 'First Name', type: 'text', name: 'firstName', length: 20 },
    { label: 'Last Name', type: 'text', name: 'lastName', length: 20 },
    { label: 'Email', type: 'email', name: 'email', length: 40},
    { label: 'Phone Number', type: 'text', name: 'phoneNumber', length: 10},
    { label: 'Street Address', type: 'text', name: 'address' , length: 40},
    { label: 'City', type: 'text', name: 'city' , length: 20},
    { label: 'State', type: 'text', name: 'state', length: 2 },
    { label: 'Zip Code', type: 'text', name: 'zip' , length: 5},
  ];



  const handleSubmit = async () => {
    axios.post('/Auth/EmailCheck', formData)
    .then((response) => {
        console.log(JSON.stringify(response.data))
        if (!response.data){
            setPasswordForm(true);
        } else {
            alert('An Account Already Exists With This Email')
        }
    })
    .catch ((error) => {
        setStatus('Error: Please try again later')
    })
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



  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step < 8) {
      handleNext(e);
    } else {
      handleSubmit(e);
    }
  };

  
  return (
    <div className='login-section'>
        {!passwordForm ? 
        <div className='login-box'>
            <h2>Register</h2>
            <div className='login-content'>

            <form onSubmit={handleFormSubmit}>
                <AnimatePresence mode="wait">
                {inputFields.map((field, index) => {
                if (index + 1 === step) {
                    return (
                        <InputField
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            length={field.length}
                            value={formData[field.name]}
                            onChange={handleChange}
                            button={button}
                        />
                        );
                    }
                    return null;
                })}
                </AnimatePresence>

                {step < 8 ? (
                    <div className='next-prev'>
                        <button type='button' onClick={handlePrevious}>
                            Previous
                        </button>
                        <button type="button" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                ) : (
                    <div className='next-prev'>
                        <button type='button' onClick={handlePrevious}>
                            Previous
                        </button>
                        <button type="button" onClick={handleSubmit}>
                            Register
                        </button>
                    </div>
                )}
            </form>
                <Link to="/Login">Already have an account? Log In!</Link>
            </div>
        </div>
        : 
        <div className='login-box'>
            <h2>Password</h2>
            <div className='login-content'>
                <form action="">
                    <input type="password" name="password" id="password" placeholder='Password' value={formData['password']} min={8} onChange={handleChange} required/>
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation" value={formData['passwordConfirmation']} placeholder='Re-Enter Password' min={8} onChange={handleChange} required/>
                    <label htmlFor="agreement">Click to agree that you have read the Terms and Agreement</label>
                    <input type="checkbox" name="agreement" id="agreement" />
                    <button type='button' onClick={(registerCustomer)}>Complete Registration</button>
                </form>
            </div>
        </div>
        }
    </div>
  )
}


export default animation(Register)
