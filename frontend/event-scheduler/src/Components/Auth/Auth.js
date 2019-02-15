import React, { Component } from 'react';

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
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
        `
      };
    } else {
      requestBody = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
      }

    }

    const userData = await fetchData(requestBody);

    if (userData.data.login.token) {
      this.context.login(
        userData.data.login.token,
        userData.data.login.userId,
        userData.data.login.tokenExpiration
      )
    }
    console.log(userData)
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
            onChange={this.handleChange} />
        </div>
        <div className="form-controls">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange} />
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
