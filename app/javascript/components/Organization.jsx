import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOrganization } from 'utils/index'
import { DonationForm, DonationHistory, Spinner } from 'components'

class Organization extends Component {
  constructor() {
    super()
    this.state = {
      organization: {},
      loading: true
    }
  }

  componentDidMount(){
    const { organization_id } = this.props.match.params
    getOrganization(organization_id).then(({ organization }) => this.setState({ organization, loading: false }))
  }

  render() {
    const { organization } = this.state

    if (this.state.loading) {
      return <Spinner color='#fff' />
    }

    return (
      <div>
        <DonationForm organization={organization} />
        <DonationHistory user={currentUser} organization={organization}/>
      </div>
    )
  }
}

export default Organization
