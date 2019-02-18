import React from 'react';

import './BookingsList.css'

const BookingsList = props => {
  return (
    <ul className="bookings-list">
      {props.bookings.map(booking => {
        return (
          <li key={booking._id} className="booking-item">
            <div>
              {booking.event.title} -- {' '}
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
            <div className="booking-item-actions">
              <button onClick={() => props.cancelBooking(booking._id)}>Cancel RSVP</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
};

export default BookingsList;
