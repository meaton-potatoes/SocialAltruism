import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOrganizations } from 'utils/index'
import { Spinner } from 'components'

class Organizations extends Component {
  constructor(){
    super()
    this.state = {
      organizations: [],
      loading: true
    }
  }

  componentDidMount(){
    getOrganizations().then(({organizations}) => this.setState({ organizations, loading: false }))
  }

  formatBody() {
    const { organizations } = this.state
    return (
      <div id='organizations'>
        {
          organizations.map(({ id, name, mission, website_url, logo_url}) => (
            <div className='organization row' key={id}>
              <div className='image col-md-4' style={{backgroundImage: `url(${logo_url})`}} />
              <div className='col-md-8'>
                <h3>{ name }</h3>
                {
                  mission && <p>{ mission.substr(0, 300) }</p>
                }
                <p><a href={website_url} target='_blank'>Website</a></p>
                <p><Link to={`/organizations/${id}/donations/new`}>Donate</Link></p>
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    const { loading } = this.state
    return (
      <div className='card'>
        <div className='row banner'>
          <div className='col-md-12'>
            <h1><i className="fas fa-building" /> Nonprofits</h1>
          </div>
        </div>
        <div className='card-body'>
          { loading ? <Spinner /> : this.formatBody() }
        </div>
      </div>
    )
  }
}

export default Organizations
