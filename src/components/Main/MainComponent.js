import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserRegistrationComponent from './UserRegistration/UserRegistrationComponent'
import UsersIndexComponent from './UsersIndex/UsersIndexComponent'
import UserShow from './UserShow/UserShow'

class MainComponent extends Component {

  render () {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={'/'} className="navbar-brand">Navbar</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to={'/'} className="nav-link">Registration</Link>
              </li>
              <li className="nav-item">
                <Link to={'/users'} className="nav-link">All users</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path='/' component={UserRegistrationComponent} />
          <Route path='/users' component={UsersIndexComponent} />
          <Route path="users/:id" component={UserShow} />
        </Switch>
      </Router>
    )
  }
}

export default MainComponent
