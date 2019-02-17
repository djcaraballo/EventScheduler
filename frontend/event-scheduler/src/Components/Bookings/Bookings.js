import React, { Component } from 'react';

import AuthContext from '../../context/authContext';
import LoadingGif from '../Loading/Loading';
import { fetchData } from '../../API/api';

class Bookings extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      bookings: [],
    }
  }

  componentDidMount() {
    this.getBookings();
  };

  getBookings = async () => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
            }
          }
        }
      `
    }
    const token = this.context.token
    const bookings = await fetchData(requestBody, token);
    this.setState({
      bookings: bookings.data.bookings
    })
    this.setState({isLoading: false});
  }

  render() {
    return(
      <React.Fragment>
      {this.state.isLoading ? (
        <LoadingGif />
      ) : (
        <ul>
        {this.state.bookings.map(booking => <li key={booking._id}>{booking.event.title} -- {new Date(booking.createdAt).toLocaleDateString()}</li>)}
        </ul>
      )}
      </React.Fragment>
    )
  }
}

export default Bookings
