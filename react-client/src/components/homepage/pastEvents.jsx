import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PastEventEntry from './pastEventEntry.jsx';
import PastEvents from '../pastEvents/index.jsx';

class PastEventsHome extends React.Component {
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
    return (
      <div>
        <h4>Your Past Logs</h4>
        <Link to="/pastEvents">Work/Play</Link>
        <h5>Most Recent</h5>
        {this.state.events.map((event, i) => (
          <PastEventEntry event={event} key={i} />
        ))}
      </div>
    );
  }
}

export default PastEventsHome;
