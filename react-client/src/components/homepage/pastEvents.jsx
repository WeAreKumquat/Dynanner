import React from 'react';
import PastEventEntry from './pastEventEntry';

class PastEvents extends React.component {
  render() {
    return (
      <div>
        Past Events
        <PastEventEntry />
      </div>
    );
  }
}

export default PastEvents;
