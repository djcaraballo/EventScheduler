import React, { Component } from 'react';

import './Events.css';
import Modal from '../Modal/Modal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createEvent: false,
    }
  }

  handleCreateEvent = () => {
    this.setState({
      createEvent: true
    });
  };

  handleCancelClick = () => {
    this.setState({
      createEvent: false
    });
  }

  handleConfirmClick = () => {
    this.setState({
      createEvent: false
    });
  }

  render() {
    return(
      <React.Fragment>
        {this.state.createEvent && <ModalBackdrop />}
        {this.state.createEvent && (
          <Modal
            title="Add Event"
            userCancel
            userConfirm
            onCancel={this.handleCancelClick}
            onConfirm={this.handleConfirmClick}>
            <form className="events-form">
              <div className="events-form-controls">
                <label htmlFor="event-title">Title</label>
                <input type="text" class="event-title"></input>
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-date">Date</label>
                <input type="date" class="event-date"></input>
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-contact">Contact</label>
                <input type="text" class="event-contact"></input>
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-location">Location</label>
                <input type="text" class="event-location"></input>
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-price">Price</label>
                <input type="number" class="event-price"></input>
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-description">Price</label>
                <textarea class="event-description" rows="4"></textarea>
              </div>
            </form>
          </Modal>
        )}
        <div className="events-controls">
          <p>Share your own events!</p>
          <button
            className="event-btn"
            onClick={this.handleCreateEvent}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default Events
