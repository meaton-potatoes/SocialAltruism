import React from 'react'

const AlertMessage = ({ errors, message }) => (
  <div className='card-body'>
    { errors && <p style={{color: 'red'}}>{ errors.join(', ') }</p> }
    { message && <p style={{color: 'green'}}>{ message }</p> }
  </div>
)

export default AlertMessage
