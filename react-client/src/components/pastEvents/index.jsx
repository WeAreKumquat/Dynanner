import React from 'react';
import Axios from 'axios';
import EventReview from './eventReview.jsx';
import EventsList from './eventsList.jsx';

class PastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <h3>Past Events</h3>
        <div className="container-fluid contents">
          <div className="row">
            <div className="col-lg-8">
              {/* currently selected event */}
              <EventReview />
            </div>
            <div className="col-lg-4">
              {/* work/play drop-down */}
              {/* list of past events */}
              <EventsList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PastEvents;
