import React, { Component } from 'react';
import get from 'lodash/get'

import './Auth.css';
import { fetchData } from '../../API/api';
import AuthContext from '../../context/authContext';

class Auth extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: true,
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = this.state;
    let requestBody;

    if(email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
              token
              tokenExpiration
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    } else {
      requestBody = {
        query: `
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      }

    }

    const userData = await fetchData(requestBody, null);
    console.log(userData)

    if (get(userData, "data.login.token")) {
      this.context.login(
        userData.data.login.token,
        userData.data.login.userId,
        userData.data.login.tokenExpiration
      )
    } else if(get(userData, "data.createUser.token")) {
      this.context.login(
        userData.data.createUser.token,
        userData.data.createUser._id,
        userData.data.createUser.tokenExpiration
      )
    }
  }

  handleModeSwitch = () => {
    this.setState(prevState => {
      return {isLogin: !prevState.isLogin}
    })
  }

  render() {
    return(
      <form
        className="auth-form"
        onSubmit={this.handleSubmit}>
        <div className="form-controls">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter email address" />
        </div>
        <div className="form-controls">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Enter password" />
        </div>
        <div className="form-buttons">
          <button
            type="submit">
            {this.state.isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type="button"
            onClick={this.handleModeSwitch}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    )
  }
}

export default Auth
