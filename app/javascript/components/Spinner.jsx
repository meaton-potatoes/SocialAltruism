import React from 'react'

const Spinner = ({ color }) => (
  <div className='spinner'>
    <div className='bounce1' style={{backgroundColor: color}}></div>
    <div className='bounce2' style={{backgroundColor: color}}></div>
    <div className='bounce3' style={{backgroundColor: color}}></div>
  </div>
)

export default Spinner
