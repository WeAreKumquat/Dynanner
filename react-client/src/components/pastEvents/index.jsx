import React from 'react';
import Axios from 'axios';
import EventReview from './eventReview.jsx';
import EventsList from './eventsList.jsx';

class PastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReview: '',
    };
    this.setCurrentReview = this.setCurrentReview.bind(this);
  }

  setCurrentReview(eventId) {
    Axios.get('/api/getReview', {
      params: { eventId },
    })
      .then((response) => {
        this.setState({ currentReview: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error('error getting review', error);
      });
  }

  render() {
    const { currentReview } = this.state;

    return (
      <div className="body">
        <h3>Past Events</h3>
        <div className="container-fluid contents">
          <div className="row">
            <div className="col-lg-8">
              {/* currently selected event */}
              <EventReview currentReview={currentReview} />
            </div>
            <div className="col-lg-4">
              {/* work/play drop-down */}
              {/* list of past events */}
              <EventsList setCurrentReview={this.setCurrentReview} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PastEvents;
