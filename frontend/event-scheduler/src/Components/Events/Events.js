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
      selectedEvent: null,
    }
    this.titleElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.contactElRef = React.createRef();
    this.locationElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.isActive = true;
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
      createEvent: false,
      selectedEvent: null,
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

    const requestBody = {
      query: `
      mutation CreateEvent(
        $title: String!,
        $date: String!,
        $contact: String!,
        $location: String!,
        $price: Float!,
        $description: String!
      ) {
        createEvent(eventInput: {
          title: $title,
          date: $date,
          contact: $contact,
          location: $location,
          price_quote: $price,
          description: $description
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
      `,
      variables: {
        title: eventTitle,
        date: eventDate,
        contact: eventContact,
        location: eventLocation,
        price: eventPrice,
        description: eventDescription
      }
    }

    const token = this.context.token;
    const confirmedEvent = await fetchData(requestBody, token);
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
      console.log(confirmedEvent)
  };

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
    if (this.isActive) {
      this.setState({
        events: events.data.events,
        isLoading: false,
      })
    }
    this.setState({isLoading: false});
  };

  handleDisplayDetail = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(event => event._id === eventId);
      return { selectedEvent };
    })
  };

  handleBookEvent = async () => {
    if(!this.context.token) {
      this.setState({selectedEvent: null})
      return;
    }
    const requestBody = {
      query: `
        mutation BookEvent($id: ID!) {
          bookEvent(eventId: $id) {
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: this.state.selectedEvent._id
      }
    }
    const token = this.context.token;
    const confirmation = await fetchData(requestBody, token);
    console.log(confirmation)
    this.setState({selectedEvent: null})
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return(
      <React.Fragment>
        {(this.state.createEvent || this.state.selectedEvent) && <ModalBackdrop />}
        {this.state.createEvent && (
          <Modal
            title="Add Event"
            userCancel
            userConfirm
            onCancel={this.handleCancelClick}
            onConfirm={this.handleConfirmClick}
            confirmText="Confirm">
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
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            userCancel
            userConfirm
            onCancel={this.handleCancelClick}
            onConfirm={this.handleBookEvent}
            confirmText={this.context.token ? "Book Event" : "Confirm"}>
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>${this.state.selectedEvent.price_quote} -- {new Date(this.state.date).toLocaleDateString()}</h2>
            <p>{this.state.selectedEvent.description}</p>
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
        {this.state.isLoading ? (
            <LoadingGif />
          ) : (
            <EventList
              events={this.state.events} authUserId={this.context.userId}
              onViewDetail={this.handleDisplayDetail}
            />
          )
        }
      </React.Fragment>
    )
  }
}

export default Events
