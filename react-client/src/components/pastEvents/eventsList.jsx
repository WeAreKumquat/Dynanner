import React from 'react';
import Axios from 'axios';
import EventListEntry from './eventListEntry.jsx';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { events, setCurrentReview } = this.props;

    return (
      <div id="past-events-list">
        <h4>Your Past Events</h4>
        <ul className="list-group">
          {events.map((event, i) => (
            <EventListEntry event={event} key={i} setCurrentReview={setCurrentReview} />
          ))}
        </ul>
      </div>
    );
  }
}

export default EventsList;
