import React, { Component } from 'react';

import './Events.css';
import Modal from '../Modal/Modal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import { fetchData } from '../../API/api';
import AuthContext from '../../context/authContext';
import EventList from '../EventList/EventList';
import LoadingGif from '../Loading/Loading';

class Events extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props)
    this.state = {
      createEvent: false,
      events: [],
      isLoading: false,
    }
    this.titleElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.contactElRef = React.createRef();
    this.locationElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.getEvents();
  };

  handleCreateEvent = () => {
    this.setState({
      createEvent: true
    });
  };

  handleCancelClick = () => {
    this.setState({
      createEvent: false
    });
  };

  handleConfirmClick = async () => {
    this.setState({
      createEvent: false
    });
    const eventTitle = this.titleElRef.current.value;
    const eventDate = this.dateElRef.current.value;
    const eventContact = this.contactElRef.current.value;
    const eventLocation = this.locationElRef.current.value;
    const eventPrice = +this.priceElRef.current.value;
    const eventDescription = this.descriptionElRef.current.value;

    if (
      eventTitle.trim().length === 0 ||
      eventDate.trim().length === 0 ||
      eventContact.trim().length === 0 ||
      eventLocation.trim().length === 0 ||
      eventPrice < 0 ||
      eventDescription.trim().length === 0
    ) {
      return;
    }

    // const event =  {
    //   title: eventTitle,
    //   date: eventDate,
    //   contact: eventContact,
    //   location: eventLocation,
    //   price_quote: eventPrice,
    //   description: eventDescription
    // }
    // console.log(event)

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {
            title: "${eventTitle}",
            date: "${eventDate}",
            contact: "${eventContact}",
            location: "${eventLocation}",
            price_quote: ${eventPrice},
            description: "${eventDescription}"
          }) {
            _id
            title
            date
            contact
            location
            price_quote
            description
          }
        }
      `
    }

    const token = this.context.token;
    const confirmedEvent = await fetchData(requestBody, token);
    console.log(confirmedEvent)
    this.setState(prevState => {
      const updatedEvents = [...prevState.events];
      updatedEvents.push({
        _id: confirmedEvent.data.createEvent._id,
        title: confirmedEvent.data.createEvent.title,
        description: confirmedEvent.data.createEvent.description,
        date: confirmedEvent.data.createEvent.date,
        price_quote: confirmedEvent.data.createEvent.price_quote,
        creator: {
          _id: this.context.userId
        }});
        return {events: updatedEvents};
    });
  }

  getEvents = async () => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            date
            contact
            location
            price_quote
            description
            creator {
              _id
              email
            }
          }
        }
      `
    }

    const events = await fetchData(requestBody, null);
    console.log(events.data.events)
    this.setState({
      events: events.data.events
    })
    this.setState({isLoading: false});
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
                <input type="text" className="event-title" ref={this.titleElRef} />
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-date">Date</label>
                <input type="datetime-local" className="event-date" ref={this.dateElRef} />
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-contact">Contact</label>
                <input type="text" className="event-contact" ref={this.contactElRef} />
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-location">Location</label>
                <input type="text" className="event-location" ref={this.locationElRef} />
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-price">Price</label>
                <input type="number" className="event-price" ref={this.priceElRef} />
              </div>
              <div className="events-form-controls">
                <label htmlFor="event-description">Description</label>
                <textarea className="event-description" rows="4" ref={this.descriptionElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-controls">
            <p>Share your own events!</p>
            <button
              className="event-btn"
              onClick={this.handleCreateEvent}>
              Create Event
            </button>
          </div>
        )}
        {this.state.isLoading ?
          <LoadingGif /> : (<EventList
            events={this.state.events} authUserId={this.context.userId} />)
        }
      </React.Fragment>
    )
  }
}

export default Events
