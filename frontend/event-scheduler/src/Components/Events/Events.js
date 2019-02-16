import React, { Component } from 'react';

import './Events.css';
import Modal from '../Modal/Modal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <React.Fragment>
        <ModalBackdrop />
        <Modal title="Add Event" userCancel userConfirm>
          <p>Modal Content</p>
        </Modal>
        <div className="events-control">
          <p>Share your own events!</p>
          <button className="event-btn">Create Event</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Events
