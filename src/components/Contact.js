import React from 'react'
import { animation } from './hoc'


const Contact = () => {
  return (
    <div className='contact-section'>
      <div>
        information & location
      </div>
      <div className='contact-us-form'>
        <form action="">
          <h2>Special Requests or Questions</h2>
          <label htmlFor="name">Your Name</label>
          <input type="text" name='name'/>
          <label htmlFor="email">Your Email</label>
          <input type="text" name='email'/>
          <label htmlFor="message">Your Message</label>
          <textarea id="" cols="30" rows="10" name='message'></textarea>
          <button>Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default animation(Contact)
