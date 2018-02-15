import React from 'react';
import Axios from 'axios';
import UpcomingEventEntry from './upcomingEventEntry';

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.getUpcomingEvents = this.getUpcomingEvents.bind(this);
  }

  componentWillMount() {
    this.getUpcomingEvents();
  }

  async getUpcomingEvents() {
    console.log('HELLOOOOOOO');
    await Axios(`http://localhost:3000/api/upcomingEvents?googleId=${this.props.currentUserId}`)
      .then((response) => {
        console.log(response);
        this.state = { events: response.data };
      })
      .catch((error) => {
        console.error('upcoming event error', error);
      });
  }

  render() {
    return (
      <div>
        Upcoming Events
        {this.state.events.map(event => (
          <UpcomingEventEntry event={event} />
        ))}
      </div>
    );
  }
}

export default UpcomingEvents;
