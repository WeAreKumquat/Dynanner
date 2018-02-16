import React from 'react';
import Axios from 'axios';
import UpcomingEventEntry from './upcomingEventEntry.jsx';

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.getUpcomingEvents = this.getUpcomingEvents.bind(this);
  }

  componentDidMount() {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    Axios('/api/upcomingEvents')
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.error('upcoming event error', error);
      });
  }

  render() {
    return (
      <div id="upcoming-events accordion">
        <h4>Upcoming Events</h4>
        {this.state.events.map((event, i) => (
          <UpcomingEventEntry event={event} key={i} />
        ))}
      </div>
    );
  }
}

export default UpcomingEvents;
