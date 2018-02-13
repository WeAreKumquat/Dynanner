import React from 'react';
import PastEventEntry from './pastEventEntry';

class PastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
