import React, { Component } from 'react'
import { getDonationStats } from 'utils'
import { Spinner } from 'components'

const STAT_DISPLAY_NAMES = {
  donation_number: 'Total Donations',
  sum_donations: 'Total Amount Donated'
}

const STAT_FORMATS = {
  donation_number: num => parseInt(num),
  sum_donations: num => `$${parseFloat(num).toFixed(2)}`
}

class Stats extends Component {
  constructor() {
    super()
    this.state = {
      stats: {}
    }
  }

  componentDidMount() {
    getDonationStats().then(stats => this.setState({ stats }))
  }

  render() {
    const { stats } = this.state

    return (
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-12' style={{textAlign: 'center'}}>
              <i className="fas fa-rocket fa-4x" />
              { Object.keys(stats).map(key => <h5 key={key}>{STAT_DISPLAY_NAMES[key]}: {STAT_FORMATS[key](stats[key])}</h5>) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stats
