import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from 'utils'
import * as _ from 'lodash'
import { Spinner } from 'components'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      loading: true
    }
  }

  componentDidMount() {
    const { user_id } = this.props.match.params
    getUser(user_id).then(({ user }) => this.setState({ user, loading: false }))
  }

  formatBody() {
    const { user, user: { stats, nickname } } = this.state
    return (
      <div className='row'>
        <div className='col-md-6'>
          <div className="card" style={{textAlign: 'center'}}>
            <br />
            <i className="fas fa-rocket fa-4x"></i>
            <div className="card-body">
              <h5>Total Donations: { stats.total_donations }</h5>
              <h5>Total Amount Donated: ${ (stats.total_amount_donated || 0).toFixed(2) }</h5>
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
                  <h5>Monthly Goal: ${ user.monthly_goal.toFixed(2) }</h5>
                  <div className="progress">
                    <div  className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                          role="progressbar"
                          style={{width: `${stats.progress_bar}%`}}
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
    )
  }

  tweetButton({ amount, pledgeling_organization_name, live, created_at }) {
    if (!live && created_at) {
      return (
        <a className="btn btn-primary btn-sm"
              style={{backgroundColor: '#1b95e0'}}
              href={`https://twitter.com/intent/tweet?text=I just donated $${amount.toFixed(2)} to ${pledgeling_organization_name}! Join me at altruism.social`}
              target="_blank"
        >
          <i className="fab fa-twitter"></i> Tweet
        </a>
      )
    }
  }

  adminView() {
    const { loading, user, user: { donations } } = this.state
    if (loading) {
      return
    }

    if (user.id == currentUser.id) {
      return (
        <div className='card'>
          <div className='card-body'>
            <h3 className='text-muted'>Admin (This is only visible to you)</h3>
            <br />
            <table className='table'>
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  donations.map(donation => (
                    <tr key={donation.created_at}>
                      <td><Link to={`/organizations/${donation.pledgeling_organization_id}`}>{donation.pledgeling_organization_name}</Link></td>
                      <td>${donation.amount.toFixed(2)}</td>
                      <td>{donation.created_at}</td>
                      <td>{ this.tweetButton(donation) }</td>
                    </tr>
                  ))
                }
                { donations.length == 0 && <tr><td className='text-muted'>You haven't made any donations yet.</td></tr> }
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }

  render(){
    const { loading, user, user: { nickname, stats } } = this.state
    const { currentUser } = this.props

    return (
      <React.Fragment>
        <div className='card'>
          <div className='row banner'>
            <div className='col-md-7'>
              <h1>
                <i className="fas fa-user-astronaut"></i>
                { loading ? '???' : nickname }'s Profile
              </h1>
            </div>
            <div className='col-md-5'>
              <h1>{ !loading && stats.leaderboard_position }</h1>
            </div>
          </div>
          <div className='card-body'>
            { loading ? <Spinner /> : this.formatBody() }
          </div>
        </div>
        { this.adminView() }
      </React.Fragment>
    )
  }
}

export default Profile
