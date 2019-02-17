import React from 'react';

import './EventItem.css'

const EventItem = props => {
  return (
    <li key={props._id} className="event-item">
      <div>
        <h1>{props.title}</h1>
        <h2>${props.price_quote}</h2>
      </div>
      <div>
        {props.userId === props.creatorId ?
          (<p>You're the owner of this event.</p>) :
          (<button className="event-btn">
          View Details
          </button>)}
      </div>
    </li>
  )
};

export default EventItem;
