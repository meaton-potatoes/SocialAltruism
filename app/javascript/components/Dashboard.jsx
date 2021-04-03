import React, { Component } from 'react'
import { Stats, DonationHistory } from 'components'

class Dashboard extends Component {
  render() {
    console.log('dashboard currentUser', currentUser)
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-md-6'>
            Hi
          </div>
          <div className='col-md-6'>
            <Stats />
            <br />
            <DonationHistory showByDefault={true} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
