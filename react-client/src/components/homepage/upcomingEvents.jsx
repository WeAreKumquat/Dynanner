import React from 'react';
import UpcomingEventEntry from './upcomingEventEntry';

class UpcomingEvents extends React.component {
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
