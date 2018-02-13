import React from 'react';
import UpcomingEventEntry from './upcomingEventEntry';

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        Upcoming Events
        <UpcomingEventEntry />
      </div>
    );
  }
}

export default UpcomingEvents;
