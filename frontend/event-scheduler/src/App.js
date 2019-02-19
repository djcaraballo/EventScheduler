import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Auth from './Components/Auth/Auth';
import AuthContext from './context/authContext';
import Bookings from './Components/Bookings/Bookings';
import Events from './Components/Events/Events';
import Nav from './Components/Nav/Nav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null
    }
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token,
      userId
    });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    const { token, userId } = this.state;

    return (
      <BrowserRouter>
        <div className="app-body">
          <AuthContext.Provider value={{
            token: token,
            userId: userId,
            login: this.login,
            logout: this.logout}}>
            <Nav />
            <main className="main-content">
              <Switch>
                {this.state.token && (<Redirect from="/" to="/events" exact />)}
                {this.state.token && (<Redirect from="/auth" to="/events" exact />)}
                {!this.state.token && (<Route path="/auth" component={Auth} />)}
                <Route path="/events" component={Events} />
                {this.state.token && (<Route path="/bookings" component={Bookings} />)}
                {!this.state.token && (<Redirect to="/auth" exact />)}
              </Switch>
            </main>
          </AuthContext.Provider>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;
