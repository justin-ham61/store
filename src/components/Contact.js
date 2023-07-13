import axios from 'axios'
import React, { useState} from 'react'
import { animation } from './hoc'


const Contact = () => {
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    console.log(formData)
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(formData.name.length > 0 && formData.name.length > 0 && formData.name.length > 0){
      axios.post('/Admin/SendContactEmail', formData)
      .then(response => {
        console.log(response)
        alert('Your message has been sent!')
      })
      .catch(error => {
        alert(error)
      })
    }
  }

  return (
    <div className='contact-section'>
      <div className='contact-information'>
        <h2>Contact Information</h2>
        <h3>Email: casadecleaners@gmail.com</h3>
        <h3>Phone: 408-298-6359</h3>
        <h3>Address: 1739 W San Carlos St, San Jose, CA 95128</h3>
        <p className='bold'>For the best response, please direct all questions or concerns to our email address!</p>
        <p className='bold'>Please include your full name and order number when applicable</p>
        <h2>Hours of Operation</h2>
        <ul>
          <li><div className='hours-day'><p>Monday</p><p>9:00 AM - 6:00 PM</p></div></li>
          <li><div className='hours-day'><p>Tuesday</p><p>9:00 AM - 6:00 PM</p></div></li>
          <li><div className='hours-day'><p>Wednesday</p><p>9:00 AM - 6:00 PM</p></div></li>
          <li><div className='hours-day'><p>Thursday</p><p>9:00 AM - 6:00 PM</p></div></li>
          <li><div className='hours-day'><p>Friday</p><p>9:00 AM - 6:00 PM</p></div></li>
          <li><div className='hours-day'><p>Saturday</p><p>9:00 AM - 5:00 PM</p></div></li>
          <li><div className='hours-day'><p>Sunday</p><p>Closed</p></div></li>
        </ul>
      </div>
      <div className='contact-us-form'>
        <form action="" onSubmit={handleClick} className='inputfield'>
          <h2>Special Requests or Questions</h2>
          <label htmlFor="name">Your Name</label>
          <input type="text" name='name' onChange={handleChange} required/>
          <label htmlFor="email">Your Email</label>
          <input type="email" name='email' onChange={handleChange} required/>
          <label htmlFor="message">Your Message</label>
          <textarea id="" cols="30" rows="10" name='message' onChange={handleChange} required></textarea>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default animation(Contact)
