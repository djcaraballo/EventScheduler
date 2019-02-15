import React, { Component } from 'react';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    const { email, password } = this.state;

    if(email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    console.log(email, password)
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
          <button type="submit">Login</button>
          <button type="button">Switch to Signup</button>
        </div>
      </form>
    )
  }
}

export default Auth
