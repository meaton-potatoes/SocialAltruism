import React, { Component } from 'react'
import { createDonation } from 'utils'
import { Redirect } from 'react-router-dom'
import { AlertMessage, Spinner } from 'components'

const formatSuccessMessage = ({ live, amount, pledgeling_organization_name }) => {
  return [
    'Your',
    (live ? null : 'TEST'),
    `donation of $${parseFloat(amount).toFixed(2)} to ${pledgeling_organization_name} has been processed!`
  ].filter(x => x).join(' ')
}

class DonationForm extends Component {
  constructor() {
    super()
    this.state = {
      donation: {
        card: {
          number: '',
          cvc: '',
          exp_month: 1,
          exp_year: 2020
        },
        amount: ''
      }
    }
  }

  setCard(field, { currentTarget: { value }}){
    let { donation, donation: { card } } = this.state
    card[field] = value
    this.setState({donation: { ...donation, ['card']: card } })
  }

  handleSubmit(e){
    e.preventDefault()

    this.setState({ loading: true }, () => {
      const { donation } = this.state
      const { organization: { id, name} } = this.props
      this.setState({ processingPayment: true }, () => {
        createDonation(Object.assign(donation, {pledgeling_organization_id: id, pledgeling_organization_name: name}))
        .then(donation => {
          return this.setState({
            loading: false,
            redirect: {
              to: `/users/${currentUser.id}`,
              props: { message: formatSuccessMessage(donation) }
            }
          })
        })
        .catch(({ errors }) => {
          this.setState({ loading: false, errors, processingPayment: false })
        })
      })
    })
  }

  formatBody() {
    const { redirect, donation, processingPayment, donation: { amount, card: { number, cvc, exp_month, exp_year }} } = this.state
    const { organization } = this.props
    if (redirect) {
      return <Redirect to={{pathname: redirect.to, state: redirect.props}} />
    }

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
                {
                  [...Array(12).keys()].map(i => {
                    const num = i + 1
                    return <option key={num}>{num <= 9 ? `0${num}` : num}</option>
                  })
                }
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
                disabled={processingPayment}
              >
                { processingPayment ? 'Processing Payment' : `Donate to ${organization.name}!` }
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
      <React.Fragment>
        <AlertMessage errors={errors} />
        <div className="card">
          <div className='row banner'>
            <div className='col-md-12'>
              <h1><i className="fas fa-hand-holding-usd"></i> Make a donation</h1>
            </div>
          </div>
          <div className="card-body">
            { loading ? <Spinner /> : this.formatBody() }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default DonationForm
