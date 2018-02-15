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
        <h4>Your Past Logs</h4>
        <h4>Most Recent</h4>
        <PastEventEntry />
      </div>
    );
  }
}

export default PastEvents;
