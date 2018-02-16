import React from 'react';
import Axios from 'axios';
import EventListEntry from './eventListEntry.jsx';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.getPastEvents = this.getPastEvents.bind(this);
  }

  componentDidMount() {
    this.getPastEvents();
  }

  getPastEvents() {
    Axios.get('/api/pastEvents')
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.error('past event error', error);
      });
  }

  render() {
    const { events } = this.state;

    return (
      <div>
        <h4>Your Past Events</h4>
        {events.map((event, i) => (
          <EventListEntry event={event} key={i} />
        ))}
      </div>
    );
  }
}

export default EventsList;
