import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from 'utils'
import * as _ from 'lodash'
import { AlertMessage, DonationHistory, Spinner } from 'components'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { user_id } = this.props.match.params

    getUser(user_id).then(
      (user) => this.setState({ user, loading: false }), // success
      ({ errors }) => this.setState({ errors, loading: false }) // failure
    )
  }

  render(){
    const { loading, errors, user } = this.state
    const { message } = this.props.location.state || {}

    if (loading) {
      return <Spinner color='#fff' />
    }

    return (
      <React.Fragment>
        <AlertMessage message={message} errors={errors} />
        <div className='card'>
          <div className='row banner'>
            <div className='col-md-7'>
              <h1>
                <i className="fas fa-user-astronaut"></i>
                { loading ? '???' : user.nickname }'s Profile
              </h1>
            </div>
            <div className='col-md-5'>
              <h1>{ !loading && user.stats && user.stats.leaderboard_position }</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className="card" style={{textAlign: 'center'}}>
                <br />
                <i className="fas fa-rocket fa-4x"></i>
                <div className="card-body">
                  <h5>Total Donations: { user.stats.total_donations }</h5>
                  <h5>Total Amount Donated: ${user.stats.total_amount_donated}</h5>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="card" style={{textAlign: 'center'}}>
                <br />
                <i className="fas fa-bullseye fa-4x"></i>
                <div className="card-body">
                  { user.monthly_goal &&
                    <React.Fragment>
                      <h5>Monthly Goal: ${parseFloat(user.monthly_goal).toFixed(2)}</h5>
                      <div className="progress">
                        <div  className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                              role="progressbar"
                              style={{width: `${user.stats.progress_bar}%`}}
                        >
                        {user.progress_bar}    
                        </div>
                      </div>
                    </React.Fragment>
                  }
                  {
                    !user.monthly_goal && `${user == currentUser ? `${user.nickname} hasn't` : 'You haven\'t'} set a monthly goal yet.`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        { user.id == currentUser.id && <DonationHistory /> }
      </React.Fragment>
    )
  }
}

export default Profile
