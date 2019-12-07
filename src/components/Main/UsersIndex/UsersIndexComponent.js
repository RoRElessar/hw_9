import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';

class UsersIndexComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('https://create-users-api.herokuapp.com/users')
      .then(res => res.json())
      .then((data) => {
        this.setState({ users: data })
      })
      .catch(console.log)
  }

  render () {
    return (
      <div>
        <h1>All users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Image</th>
              <th>Sex</th>
              <th>Subscription</th>
              <th>Additional Information</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.region}</td>
                  <td><img width="250px" className="img-thumbnail img-fluid" src={user.image.url} alt={user.name}/></td>
                  <td>{user.sex}</td>
                  <td>{user.subscription}</td>
                  <td>{user.additional_information}</td>
                  <td>
                    <Router>
                      <Link className="btn btn-primary" to={`/users/${user.id}`}>Show more</Link>
                    </Router>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default UsersIndexComponent
