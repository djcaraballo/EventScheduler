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
          <p>Modal Content</p>
          </Modal>
        )}
        <div className="events-control">
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
