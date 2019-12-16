import React, { Component } from 'react'
import SpinnerComponent from '../Spinner/SpinnerComponent'


class UserShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        id: '',
        first_name: '',
        last_name: '',
        name: '',
        email: '',
        region: '',
        image: '',
        sex: '',
        subscription: '',
        additional_information: '',
      },
      spinner: true
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.id

    fetch('https://create-users-api.herokuapp.com/users/' + userId)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          spinner: false,
          user: {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            name: data.name,
            email: data.email,
            region: data.region,
            image: data.image.url,
            sex: data.sex,
            subscription: data.subscription,
            additional_information: data.additional_information
          }
        })
      })
      .catch(console.log)
  }

  render () {
    const { user } = this.state

    return (
      <div>
        {this.state.spinner && <SpinnerComponent/>}
        <h1>{user.first_name} {user.last_name}</h1>

        <div className="user-information">
          <img src={user.image} alt={user.name} width="250px"/>
          <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
          <div className="additional-information">{user.additional_information}</div>
        </div>
      </div>
    )
  }
}

export default UserShow
