import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOrganizations } from 'utils/index'
import { AlertMessage, Spinner } from 'components'

const DEFAULT_PARAMS = {
  page: 1
}

const mapSearchParamsToInitialState = () => {
  const searchParams = new URL(location.href).searchParams
  return ['query', 'page'].reduce((obj, param) => {
    const value = searchParams.get(param) || DEFAULT_PARAMS[param]
    if (value) {
      obj[param] = value
    }
    return obj
  }, {})
}

class Organizations extends Component {
  constructor(){
    super()
    this.state = {
      organizations: [],
      loading: true,
      searchField: ''
    }
  }

  componentDidMount(){
    const { query, page } = mapSearchParamsToInitialState()
    this.setState({ query, page }, () => this.getOrganizations()) 
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state
    if (prevState.page != page || prevState.query != query) {
      this.getOrganizations()
    }
  }

  getOrganizations(){
    const { query, page } = this.state
    getOrganizations({ query, page })
      .then(({page, organizations, total_count, total_pages}) => {
        return this.setState({ page, organizations, totalCount: total_count, totalPages: total_pages, loading: false, errors: null })
      })
      .catch(({ errors }) => {
        return this.setState({ errors, organizations: null, totalCount: null, totalPages: null, loading: false })
      })
  }

  updateSearchField({ currentTarget: { value } }){
    this.setState({searchField: value})
  }

  search(e) {
    e.preventDefault()

    const { searchField } = this.state
    this.setState({query: searchField, page: 1})
  }

  formatPagination() {
    const { page, totalCount, totalPages } = this.state
    const firstPage = page - 1 > 1 && [1, '...']
    const previousPage = page > 1 && page - 1
    const nextPage = page < totalPages && page + 1
    const lastPage = page + 1 < totalPages && ['...', totalPages]
    const displayPages = [firstPage, previousPage, page, nextPage, lastPage].flat().filter(x => x)
    return (
      <nav aria-label='Results navigation'>
        <ul className='pagination justify-content-center'>
          <li className={`page-item ${page == 1 && 'disabled'}`}>
            <a className='page-link' onClick={() => this.setState({page: page - 1})}>Previous</a>
          </li>
          {
            displayPages.map((num, i) => {
              return <li key={`page-${i}`} className={`page-item ${parseInt(num) != num && 'disabled'} ${num == page && 'active'}`}>
                       <a className='page-link' onClick={() => this.setState({page: num})}>{num}</a>
                     </li>
            })
          }
          <li className={`page-item ${page == totalPages && 'disabled'}`}>
            <a className='page-link' onClick={() => this.setState({page: page + 1})}>Next</a>
          </li>
        </ul>
      </nav>
    )
  }

  render() {
    const { loading, errors, searchField, organizations, totalCount } = this.state

    if (loading) {
      return <Spinner color='#000' />
    }

    return (
      <React.Fragment>
        <AlertMessage errors={errors} />
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-12'>
                <h1>🏛 Organizations</h1>
              </div>
            </div>
            <div id='organizations'>
              <div className='col-md-12'>
                <form className='input-group mb-3'>
                  <input type='text' className='form-control' onChange={e => this.updateSearchField(e)} value={searchField} />
                  <div className='input-group-append'>
                    <button className='btn btn-primary' onClick={e => this.search(e)}>Search</button>
                  </div>
                </form>
              </div>
              <div className='text-center'>{totalCount} result(s)</div>
              <table className='table'>
                <tbody>
                  {
                    organizations.map(({ id, name, mission, website_url, logo_url}) => (
                      <tr key={id}>
                        <td><Link to={`/organizations/${id}/donations/new`}>{name}</Link></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              { this.formatPagination() }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Organizations
