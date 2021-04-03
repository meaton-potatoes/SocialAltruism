import React, { Component } from 'react'
import { getLeaderboard } from 'utils'
import { Spinner } from 'components'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class Leaderboard extends Component {
  constructor(){
    super()
    this.state = {
      date: new Date(),
      ranked_users: [],
      loading: true
    }
  }

  componentDidMount(){
    getLeaderboard().then(({ date, ranked_users }) => this.setState({ date: new Date(date), ranked_users, loading: false }))
  }

  formatBody(){
    const { ranked_users } = this.state
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>User</th>
            <th>Amount Donated</th>
          </tr>
        </thead>
        <tbody>
          {
            ranked_users.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <a href="<%= user_path(user.id) %>">
                      { user.id == currentUser.id ? 'You' : (user.nickname ? user.nickname : '???') }
                    </a>
                  </td>
                  <td>
                    { user.total }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  render(){
    const { loading, date } = this.state

    return (
      <div className='card'>
        <div className='row banner'>
          <div className='col-md-12'>
            <h1><i className="fas fa-medal" /> Top donors for {MONTHS[date.getMonth()]}</h1>
          </div>
        </div>
        <div className='card-body'>
          { loading ? <Spinner /> : this.formatBody() }
        </div>
      </div>
    )
  }
}

export default Leaderboard
