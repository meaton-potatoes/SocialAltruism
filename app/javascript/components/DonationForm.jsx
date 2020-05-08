import React, { Component } from 'react'
import { getOrganization, createDonation } from 'utils'
import { Spinner } from 'components'

class DonationForm extends Component {
  constructor() {
    super()
    this.state = {
      organization: {},
      donation: {
        card: {
          number: '',
          cvc: '',
          exp_month: 1,
          exp_year: 2020
        },
        amount: ''
      },
      loading: true
    }
  }

  componentDidMount(){
    const { organization_id } = this.props.match.params
    getOrganization(organization_id).then(({organization}) => this.setState({ organization, loading: false }))
  }

  setCard(field, { currentTarget: { value }}){
    let { donation, donation: { card } } = this.state.donation
    card[field] = value
    this.setState({donation: { ...donation, ['card']: card } })
  }

  handleSubmit(e){
    e.preventDefault()

    const { donation, organization: { id, name} } = this.state
    createDonation(Object.assign(donation, {pledgeling_organization_id: id, pledgeling_organization_name: name}))
    .then(({ message, success }) => {
      if (success) {
        return <Redirect to={`/users/${id}`} message={message} />
      } else {
        this.setState({ errors: message })
      }
    })
  }

  formatBody() {
    const { organization, donation, donation: { amount, card: { number, cvc, exp_month, exp_year }} } = this.state
    return (
      <form>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor='pledgeling_organization_name'>
              Organization
            </label>
            <input type="text" disabled value={organization.name} id='pledgeling_organization_name' className='form-control' />
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='amount'>Amount</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  step='.01'
                  onChange={({ currentTarget: { value }}) => this.setState({donation: { ...donation, ['amount']: value } })}
                  value={amount}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='card_number'>Card Number</label>
              <input  type="string"
                      id='card_number'
                      className='form-control'
                      onChange={(e) => this.setCard('number', e)}
                      value={number || ''}
                      required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='card_cvc'>CVC</label>
              <input  type="number"
                      id='card_cvc'
                      className='form-control'
                      onChange={(e) => this.setCard('cvc', e)}
                      value={cvc || ''}
                      required
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='exp_month'>Expiration Month</label>
              <select
                name="donation[card][exp_month]"
                id='exp_month'
                className='form-control'
                onChange={(e) => this.setCard('exp_month', e)}
                value={exp_month}
              >
                { [...Array(12).keys()].map(i => <option key={i + 1}>{i + 1}</option>) }
              </select>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='exp_year'>Expiration Year</label>
              <select
                name="donation[card][exp_year]"
                id='exp_year'
                className='form-control'
                onChange={(e) => this.setCard('exp_year', e)}
                value={exp_year}
              >
              { [...Array(10).keys()].map(i => <option key={i + 2020}>{i + 2020}</option>) }
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='form-group'>
              <label></label>
              <button
                className='form-control btn btn-primary'
                id='donate'
                onClick={e => this.handleSubmit(e)}
              >
                Donate to {organization.name}!
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  render() {
    const { errors, loading } = this.state

    return(
      <div className="card">
        <div className='row banner'>
          <div className='col-md-12'>
            <h1><i className="fas fa-hand-holding-usd"></i> Make a donation</h1>
          </div>
        </div>
        <div className="card-body">
          { errors && <p style={{color: 'red'}}>{ errors }</p> }
          { loading ? <Spinner /> : this.formatBody() }
        </div>
      </div>
    )
  }
}

export default DonationForm
