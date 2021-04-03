import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getDonations } from 'utils/index'
import { Spinner } from 'components'

const formatDate = str => {
  const date = new Date(str)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

class DonationHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      show: props.showByDefault
    }
  }

  componentDidMount(){
    const { organization } = this.props
    getDonations({ organization_id: organization && organization.id }).then(({ donations, stats }) => {
      this.setState({ donations, stats, loading: false })
    })
  }

  toggle() {
    this.setState({ show: !this.state.show })
  }

  tweetButton({ amount, pledgeling_organization_name, created_at }) {
    const tweetText = `I just donated $${parseFloat(amount).toFixed(2)} to ${pledgeling_organization_name}! Join me at altruism.social`

    return (
      <a className='btn btn-primary btn-sm'
            style={{backgroundColor: '#1b95e0'}}
            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank"
      >
        <i className="fab fa-twitter"></i> Tweet
      </a>
    )
  }

  render() {
    const { title, organization } = this.props
    const { donations, stats, loading, show } = this.state

    if (loading) {
      return <Spinner />
    }

    return (
      <div className='card'>
        <div className='card-body'>
          <h1 style={{ display: 'flex', justifyContent: 'space-between'}}>
            <span><i className='fas fa-history' /> Donation History</span>
            <i className={`fas fa-angle-${show ? 'down' : 'right'}`} onClick={() => this.toggle()} />
          </h1>
          {
            show && <table className='table'>
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
                              <td>
                                <Link to={`/organizations/${donation.pledgeling_organization_id}`}>
                                  { donation.live ? donation.pledgeling_organization_name : `[TEST] ${donation.pledgeling_organization_name}`}
                                </Link>
                              </td>
                              <td>${parseFloat(donation.amount).toFixed(2)}</td>
                              <td>{formatDate(donation.created_at)}</td>
                              <td>{ donation.live && this.tweetButton(donation) }</td>
                            </tr>
                          ))
                        }
                        { donations.length == 0 && <tr><td className='text-muted'>You haven't made any donations yet.</td></tr> }
                      </tbody>
                    </table>
          }
        </div>
      </div>
    )
  }
}

export default DonationHistory
