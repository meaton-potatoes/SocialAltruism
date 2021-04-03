import React, { Component } from 'react'
import { getFriends } from 'utils'

class Friends extends Component {

  componentDidMount() {
    this.getFriends()
  }

  getFriends() {
    getFriends().then(
      friends => this.setState({ friends, loading: false }),
      errors => this.setState({ errors, loading: false })
    )
  }

  render() {
    return (
      <div className='card'>
        <div className='row banner'>
          <div className='col-md-12'>
            <h1>
              <i className="fas fa-user-friends"></i>
              Friends
            </h1>
          </div>
        </div>
        <div className='card-body'>
          Friends
        </div>
      </div>
    )
  }
}

export default Friends
