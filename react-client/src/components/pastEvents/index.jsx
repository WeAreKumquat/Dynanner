import React from 'react';
import Axios from 'axios';
import EventReview from './eventReview.jsx';
import EventsList from './eventsList.jsx';

class PastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentReview: '',
      currentReviewTitle: '',
    };
    this.getPastEvents = this.getPastEvents.bind(this);
    this.setCurrentReview = this.setCurrentReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getPastEvents(this.props.location.state.category);
  }

  getPastEvents(category) {
    console.log('getting past events');

    Axios.get('/api/pastEvents', {
      params: { category },
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.error('past event error', error);
      });
  }

  setCurrentReview(eventId, title) {
    this.setState({ currentReviewTitle: title });

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

  handleChange(event) {
    const category = event.target.value;
    this.getPastEvents(category);
    console.log('event target value', event.target.value);
    console.log('!!!!!', this.state.category);
  }

  render() {
    const { events, currentReview, currentReviewTitle, category } = this.state;

    return (
      <div className="body">
        <h3>Past Events</h3>
        <div className="container-fluid contents">
          <div className="row">
            <div className="col-lg-8">
              {/* currently selected event's review */}
              <EventReview currentReview={currentReview} currentReviewTitle={currentReviewTitle} />
            </div>
            <div className="col-lg-4">
              {/* work/play drop-down */}
              <select value={this.state.category} onChange={this.handleChange}>
                <option value="work">Work</option>
                <option value="play">Play</option>
              </select>
              {/* list of past events */}
              <EventsList events={events} setCurrentReview={this.setCurrentReview} categorySelected={category} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PastEvents;
