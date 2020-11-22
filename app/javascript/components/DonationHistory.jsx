import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getDonations } from 'utils/index'
import { Spinner } from 'components'

const formatDate = str => {
  const date = new Date(str)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

class DonationHistory extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    const { organization } = this.props
    getDonations({ organization_id: organization && organization.id }).then(donations => {
      this.setState({ donations, loading: false })
    })
  }

  tweetButton({ amount, pledgeling_organization_name, live, created_at }) {
    if (!live) {
      return <div>Test mode</div>
    }

    return (
      <a className="btn btn-primary btn-sm"
            style={{backgroundColor: '#1b95e0'}}
            href={`https://twitter.com/intent/tweet?text=I just donated $${parseFloat(amount).toFixed(2)} to ${pledgeling_organization_name}! Join me at altruism.social`}
            target="_blank"
      >
        <i className="fab fa-twitter"></i> Tweet
      </a>
    )
  }

  render() {
    const { organization } = this.props
    const { donations, loading } = this.state

    if (loading) {
      return <Spinner />
    }

    return (
      <div className='card'>
        <div className='card-body'>
          <h3 className='text-muted'>Admin View (this is only visible to you)</h3>
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
                    <td>${parseFloat(donation.amount).toFixed(2)}</td>
                    <td>{formatDate(donation.created_at)}</td>
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

export default DonationHistory
