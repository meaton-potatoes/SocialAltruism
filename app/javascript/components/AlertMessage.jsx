import React from 'react'

const AlertMessage = ({ errors, message }) => {
  if (errors || message) {
    return (
      <div className='card'>
        <div className='card-body'>
          { errors && <h5 style={{color: 'red'}}>{ errors.join(', ') }</h5> }
          { message && <h5 style={{color: 'green'}}>{ message }</h5> }
        </div>
      </div>
    )
  }
  return <React.Fragment />
}

export default AlertMessage
