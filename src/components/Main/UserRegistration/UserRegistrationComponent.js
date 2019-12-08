import React, { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserRegistration.scss'
import { FormErrorsComponent } from './FormErrors/FormErrorsComponent'

class UserRegistrationComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        region: '',
        sex: 'male',
        subscription: false,
        additional_information: '',
        image: null,
      },
      formErrors: {
        first_name: '',
        last_name: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: '',
      },
      firstNameValid: false,
      lastNameValid: false,
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordConfirmationValid: false,
      imageValid: false,
      formValid: false,
    }
  }

  changeHandler = event => {
    const name = event.target.name
    let value

    if (event.target.type === 'file') {
      value = event.target.files
    } else {
      value = event.target.value
    }

    this.setState({
      user: {
        [name]: value
      }
    },
      () => { this.validateField(name, value)
    })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let firstNameValid = this.state.firstNameValid
    let lastNameValid = this.state.lastNameValid
    let nameValid = this.state.nameValid
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid
    let passwordConfirmationValid = this.state.passwordConfirmationValid
    let imageValid = this.state.imageValid
    const passwordInput = document.getElementById('password')
    const passwordConfirmationInput = document.getElementById('passwordConfirmation')
    const nameMatches = /^[0-9a-zA-Z]+$/
    const emailMatches = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i

    switch (fieldName) {
      case 'first_name':
        firstNameValid = value.length > 0 && nameMatches.test(value)
        fieldValidationErrors.first_name = firstNameValid ? '' : ' is invalid, use only letters and numbers'
        break
      case 'last_name':
        lastNameValid = value.length > 0 && nameMatches.test(value)
        fieldValidationErrors.last_name = lastNameValid ? '' : ' is invalid, use only letters and numbers'
        break
      case 'name':
        nameValid = value.length > 0 && nameMatches.test(value)
        fieldValidationErrors.name = nameValid ? '' : ' is invalid, use only letters and numbers'
        break
      case 'email':
        emailValid = emailMatches.test(value)
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'
        break
      case 'password':
        passwordValid = value.length >= 10 && value === passwordConfirmationInput.value
        fieldValidationErrors.password = passwordValid ? '' : ' is too short and must match password confirmation input'
        break
      case 'password_confirmation':
        passwordConfirmationValid = value.length >=10 && value === passwordInput.value
        fieldValidationErrors.password_confirmation = passwordConfirmationValid ?
          '' :
          ' is too short and must match password input'
        break
      case 'image':
        imageValid = value.length > 0 &&
          (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        fieldValidationErrors.image = imageValid ? '' : ` only jpg, jpeg and png files are allowed`
        break
      default:
        break
    }

    this.setState({
      formErrors: fieldValidationErrors,
      firstNameValid: firstNameValid,
      lastNameValid: lastNameValid,
      nameValid: nameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      passwordConfirmationValid: passwordConfirmationValid,
      imageValid: imageValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirmationValid &&
        this.state.imageValid
    });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  notify = () => {
    toast
      .success('Thank you for registration! If you want to see all registered user, proceed to \'All users\' page, please.')
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.target)

    axios.post('https://create-users-api.herokuapp.com/users', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    this.setState({
      user: {
        first_name: '',
        last_name: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        region: '',
        sex: 'male',
        subscription: false,
        additional_information: '',
        image: null,
      }
    })
    this.notify()
  }

  render () {
    return (
      <div>
        <h1>Registration</h1>
        <div className="container">
          <div className="panel panel-default">
            <FormErrorsComponent formErrors={this.state.formErrors}/>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className={`form-group ${this.errorClass(this.state.formErrors.first_name)}`}>
                  <label htmlFor="firstName">First Name</label>
                  <input type="text"
                         className="form-control"
                         id="firstName"
                         onChange={this.changeHandler}
                         value={this.state.user.first_name}
                         name="first_name"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className={`form-group ${this.errorClass(this.state.formErrors.last_name)}`}>
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text"
                         className="form-control"
                         id="lastName"
                         onChange={this.changeHandler}
                         value={this.state.user.last_name}
                         name="last_name"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                  <label htmlFor="name">Name</label>
                  <input type="text"
                         className="form-control"
                         id="name"
                         onChange={this.changeHandler}
                         value={this.state.user.name}
                         name="name"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                  <label htmlFor="exampleFormControlInput1">Email address</label>
                  <input type="email"
                         className="form-control"
                         id="exampleFormControlInput1"
                         placeholder="name@example.com"
                         autoComplete="off"
                         onChange={this.changeHandler}
                         value={this.state.user.email}
                         name="email"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                  <label htmlFor="password">Password</label>
                  <input type="password"
                         className="form-control"
                         id="password"
                         autoComplete="off"
                         onChange={this.changeHandler}
                         value={this.state.user.password}
                         name="password"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className={`form-group ${this.errorClass(this.state.formErrors.password_confirmation)}`}>
                  <label htmlFor="passwordConfirmation">Confirm Password</label>
                  <input type="password"
                         className="form-control"
                         id="passwordConfirmation"
                         autoComplete="off"
                         onChange={this.changeHandler}
                         value={this.state.user.password_confirmation}
                         name="password_confirmation"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Region</label>
                  <select className="form-control"
                          id="exampleFormControlSelect1"
                          onChange={this.changeHandler}
                          value={this.state.user.region}
                          name="region">
                    <option>Ukraine</option>
                    <option>USA</option>
                    <option>Japan</option>
                    <option>Spain</option>
                    <option>Norway</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6">
                <label>Sex</label>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="sex"
                               id="male"
                               onChange={this.changeHandler}
                               value="male"
                               checked={this.state.user.sex === 'male'}/>
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="sex"
                               id="female"
                               onChange={this.changeHandler}
                               value="female"
                               checked={this.state.user.sex === 'female'}/>
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Additional information</label>
                  <textarea className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={this.changeHandler}
                            value={this.state.user.additional_information}
                            name="additional_information"/>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group text-left">
                  <br/>
                  <input type="checkbox"
                         id="subscription"
                         name="subscription"/>
                  <label htmlFor="subscription">Subscribe for newsletters?</label>
                </div>
              </div>

              <div className="col-lg-6">
                <div className={`form-group text-left ${this.errorClass(this.state.formErrors.image)}`}>
                  <label htmlFor="image">Image</label><br/>
                  <input type="file"
                         id="image"
                         onChange={this.changeHandler}
                         name="image"/>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <button type="submit"
                          className="btn btn-block btn-primary"
                          disabled={!this.state.formValid}>Register</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default UserRegistrationComponent
