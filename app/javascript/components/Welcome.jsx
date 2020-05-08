import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getDonationStats } from 'utils'

class Welcome extends Component {
  constructor() {
    super()
    this.state = {
      stats: {}
    }
  }

  componentDidMount() {
    getDonationStats().then(({ stats }) => this.setState({ stats }))
  }

  render() {
    const { stats } = this.state
    if (!currentUser) {
      const { nickname, id } = currentUser
      return (
        <div className='card'>
          <div className='row banner'>
            <div className='col-md-12'>
              <h1><i className="fas fa-hand-sparkles"></i> Welcome {nickname}</h1>
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-12' style={{textAlign: 'center'}}>
                <div className='card'>
                  <br />
                  <i className="fas fa-rocket fa-4x" />
                  <div className='card-body'>
                    { Object.keys(stats).map(key => <h5>{key}: {stats[key]}</h5>) }
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='card' style={{textAlign: 'center'}}>
                  <br />
                  <i className="fas fa-medal fa-4x" />
                  <div className='card-body'>
                    <h5 className='card-title'><Link to='/organizations'>Discover Nonprofits</Link></h5>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card' style={{textAlign: 'center'}}>
                  <br />
                  <i className="fas fa-medal fa-4x" />
                  <div className='card-body'>
                    <h5 className='card-title'><Link to='/leaderboard'>View Leaderboard</Link></h5>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card' style={{textAlign: 'center'}}>
                  <br />
                  <i className="fas fa-user-astronaut fa-4x" />
                  <div className='card-body'>
                    <h5 className='card-title'><Link to={`/users/${id}`}> My Profile</Link></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='card'>
          <div className='row banner'>
            <div className='col-md-12'>
              <h1><i className="fas fa-hand-sparkles"></i> Welcome</h1>
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-12' style={{textAlign: 'center'}}>
                <div className='card'>
                  <br />
                  <i className="fas fa-rocket fa-4x" />
                  <div className='card-body'>
                    { Object.keys(stats).map(key => <h5>{key}: {stats[key]}</h5>) }
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='card' style={{textAlign: 'center'}}>
                  <br />
                  <i className="fas fa-info-circle fa-4x" />
                  <div className='card-body'>
                    <h5 className='card-title'>Where am I?</h5>
                    <Link to='/about' className='btn btn-primary'>Find out.</Link>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card' style={{textAlign: 'center'}}>
                  <br />
                  <i className="fas fa-hand-holding-heart fa-4x" />
                  <div className='card-body'>
                    <h5 className='card-title'>Where's the "altruism"?</h5>
                    <Link to='/organizations' className='btn btn-primary'>Discover nonprofits.</Link>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card' style={{textAlign: 'center'}}>
                  <br />
                  <i className="fas fa-medal fa-4x" />
                  <div className='card-body'>
                    <h5 className='card-title'>Where's the "social"?</h5>
                    <Link to='/leaderboard' className='btn btn-primary'>Start here.</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Welcome
