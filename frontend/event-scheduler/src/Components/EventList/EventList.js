import React from 'react';

import './EventList.css';
import EventItem from '../EventItem/EventItem';

const EventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price_quote={event.price_quote}
        userId={props.authUserId}
        creatorId={event.creator._id}
        date={event.date}
        viewDetail={props.onViewDetail} />
    );
  });

  return (
    <ul className="event-list">
      {events}
    </ul>
  )
};

export default EventList;
