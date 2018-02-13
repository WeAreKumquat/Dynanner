import React from 'react';
import EventListEntry from './eventListEntry';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <EventListEntry />
      </div>
    );
  }
}

export default EventsList;
