import React from 'react'

const AdminNav = ({setActiveElement, activeElement}) => {
  return (
    <div className='admin-nav-section'>
      <ul>
        <li onClick={() => setActiveElement('orders')} className={activeElement === 'orders' ? 'active' : ''}>Orders</li>
        <li onClick={() => setActiveElement('customers')} className={activeElement === 'customers' ? 'active' : ''}>Customers</li>
        <li onClick={() => setActiveElement('items')} className={activeElement === 'items' ? 'active' : ''}>Items</li>
      </ul>
    </div>
  )
}

export default AdminNav
