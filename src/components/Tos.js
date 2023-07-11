import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Tos = ({onClick}) => {
  return (
    <div className='tos'>
      <div className="tos-header">
        <h2>Terms and Agreement</h2>
        <FontAwesomeIcon icon={faCircleXmark} size='xl' className='clickable' onClick={() => onClick(false)}/>
      </div>
      <div className="tos-body">
        <p>Terms and Agreement for Unattended Delivery Service
Introduction
This document outlines the terms and conditions for the unattended delivery service provided by [Your Business Name] ("we," "us," or "our") to the customer ("you" or "your"). By using our unattended delivery service, you agree to be bound by these terms and conditions.
Description of Unattended Delivery Service
Our unattended delivery service allows us to drop off your cleaned garments at your designated delivery location, even if you are not present at the time of delivery. This service is provided as a convenience to you, subject to the terms and conditions outlined below.
Your Responsibilities
By using our unattended delivery service, you agree to:
a) Provide a secure, easily accessible, and weather-protected location for the delivery of your garments. You are responsible for ensuring that the delivery location is suitable for unattended deliveries.
b) Notify us of any changes to your delivery location or any specific delivery instructions in advance.
c) Accept responsibility for any theft, damage, or loss of garments that may occur after we have made the delivery to the designated location. We are not liable for any losses or damages that occur after the garments have been delivered.
d) Promptly inspect the delivered garments and notify us of any issues, discrepancies, or damages within [a specified time frame, e.g., 24 hours] of delivery.
Our Responsibilities
We agree to:
a) Provide unattended delivery services in a professional and timely manner, consistent with our standard delivery procedures.
b) Ensure that your garments are securely packaged and protected from weather-related damage to the best of our ability.
c) Notify you when your garments have been delivered, by means of [phone, email, text message, or any other agreed-upon communication method].
Limitation of Liability
Our liability for any loss or damage related to the unattended delivery service is limited to the value of the garments being delivered, up to a maximum amount of [specify a dollar amount or coverage limit]. This limitation of liability does not apply in cases of gross negligence or willful misconduct on our part.
Modifications and Termination
We reserve the right to modify or discontinue the unattended delivery service at any time, with or without notice. If we modify these terms and conditions, we will notify you and your continued use of the service constitutes your acceptance of the modified terms.
Governing Law
These terms and conditions shall be governed by and construed in accordance with the laws of the [specify state or jurisdiction].
By using our unattended delivery service, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any part of these terms and conditions, please do not use our unattended delivery service.
Again, I recommend consulting with a legal professional to ensure your terms and agreement document is legally enforceable and complies with all applicable laws and regulations.
</p>
      </div>
    </div>
  )
}

export default Tos
