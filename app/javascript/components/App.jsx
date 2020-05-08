import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Navbar } from 'components/index'

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <Navbar/>
        <div className="container">
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default App
