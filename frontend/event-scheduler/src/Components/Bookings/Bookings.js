import React, { Component } from 'react';

import AuthContext from '../../context/authContext';
import LoadingGif from '../Loading/Loading';
import { fetchData } from '../../API/api';
import BookingsList from '../BookingsList/BookingsList';

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

  handleCancelBooking = async bookingId => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId
      }
    }
    const token = this.context.token
    const bookings = await fetchData(requestBody, token);
    this.setState(prevState => {
      const updatedBookings = prevState.bookings.filter(booking => {
        return booking._id !== bookingId;
      });
      return {
        bookings: updatedBookings,
        isLoading: false,
      };
    })
    this.setState({isLoading: false});
  }

  render() {
    return(
      <React.Fragment>
      {this.state.isLoading ? (
        <LoadingGif />
      ) : (
        <BookingsList
          bookings={this.state.bookings}
          cancelBooking={this.handleCancelBooking} />
      )}
      </React.Fragment>
    )
  }
}

export default Bookings
