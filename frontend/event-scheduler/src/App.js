import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import Auth from './Components/Auth/Auth';
import Events from './Components/Events/Events';
import Bookings from './Components/Bookings/Bookings';
import Nav from './Components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Nav />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={Auth} />
            <Route path="/events" component={Events} />
            <Route path="/bookings" component={Bookings} />
          </Switch>
        </main>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
