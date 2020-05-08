import React, { Component } from 'react'
import { Redirect } from 'react-dom';
import { getUser, updateUser } from 'utils'
import { Link } from 'react-router-dom'
import { Profile, Spinner } from 'components'

class ProfileForm extends Component {
  constructor(){
    super()
    this.state = {
      loading: true,
      user: {}
    }
  }

  componentDidMount(){
    const { user_id } = this.props.match.params
    getUser(user_id).then(({ user }) => this.setState({ user, loading: false}))
  }

  handleChange({ currentTarget: { id, value }}) {
    const { user } = this.state
    this.setState({user: { ...user, [id]: value } })
  }

  handleSubmit(e){
    e.preventDefault()

    const { user } = this.state
    updateUser(user).then(({ message, success }) => {
      debugger
      if (success) {
        return <Redirect to={Profile} message={message} />
      } else {
        this.setState({ errors: message })
      }
    })
  }

  formatBody() {
    const { user } = this.state
    return (
      <form>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='first_name'>First Name (required to make a donation)</label>
              <input
                type="text"
                id='first_name'
                value={user.first_name || ''}
                className='form-control'
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='last_name'>Last Name (required to make a donation)</label>
              <input
                type="text"
                id="last_name"
                value={user.last_name || ''}
                className='form-control'
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='nickname'>Nickname (This will be visible on your profile)</label>
              <input
                type="text"
                id="nickname"
                value={user.nickname || ''}
                className='form-control'
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor="monthly_goal">Monthly Goal</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="monthly_goal"
                  value={user.monthly_goal || ''}
                  step='.01'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='privacy_level'>Who can see your profile?</label>
              <select id='privacy_level' name='user[privacy_level]' className='form-control' onChange={(e) => this.handleChange(e)}>
                { ['everyone', 'users', 'friends', 'only_me'].map((option, i) => <option key={option} value={i}>{option}</option>) }
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <button className='btn btn-primary' onClick={(e) => this.handleSubmit(e)}>Update</button>
          <Link to={`/users/${currentUser.id}`} className='btn btn-outline-secondary'>Cancel</Link>
        </div>
      </form>
    )
  }

  render(){
    const { loading, errors } = this.state
    return (
      <div className='card'>
        <div className='row banner'>
          <div className='col-md-12'>
            <h1><i className="fas fa-user-edit" /> Edit Profile</h1>
          </div>
        </div>
        <div className='card-body'>
          { errors && <p style={{color: 'red'}}>{ errors }</p> }
          { loading ? <Spinner /> : this.formatBody() }
        </div>
      </div>

    )
  }
}

export default ProfileForm
