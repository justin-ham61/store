import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { animation } from './hoc'

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const {state} = useLocation();

  const [ verificationPanel, toggleVerificationPanel] = useState(false)
  const [ verificationState, setVerificationState ] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  useEffect(() => {
    if(state){
      if (state.message === 'verified'){
        setVerificationState('Verified')
        toggleVerificationPanel(true)
      } else if (state.message === 'notverified'){
        setVerificationState('Not Verified')
        toggleVerificationPanel(true)
      }
    }
  }, [state])

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
        alert(response.data.message)
        // display an error message
      }
    })
    .catch(error => {
      alert(error.response.data.message)
      console.log(error.response.data.message)
      console.log(error.message)
      console.error('Error:', error.message);
    });
  }

  return (
    <div className='login-section'>
      <h2>Sign In</h2>
      <form>
          <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
          <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
          <button type='button' onClick={(handleSubmit)}>Sign In</button>
      </form>
      <Link to="/Register">Don't have an account? Create one!</Link>
    </div>
  )
}

export default animation(Login)
