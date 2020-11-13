import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const formatBody = () => {
    if (currentUser) {
      return (
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {currentUser.email}
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to={`/users/${currentUser.id}`} className="dropdown-item">Profile</Link>
            <Link to={`/users/${currentUser.id}/edit`} className="dropdown-item">Edit Profile</Link>
            <Link to='/organizations' className="dropdown-item">View Nonprofits</Link>
            <Link to='/leaderboard' className="dropdown-item">Leaderboard</Link>
            <div className="dropdown-divider"></div>
            <Link to='/logout' className='dropdown-item'>Logout</Link>
          </div>
        </li>
      )
    } else {
      return (
        <li className="nav-item">
          <form action='/auth/auth0' method='POST'>
            <input type='hidden' name='authenticity_token' value={authenticityToken} />
            <button className='btn btn-primary'>Login</button>
          </form>
        </li>
      )
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand" to="/"><i className="fas fa-dove"></i> Social Altriusm</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to='/about' className='nav-link'>About</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          { formatBody() }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
