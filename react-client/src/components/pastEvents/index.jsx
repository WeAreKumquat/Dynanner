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
      currentReviewEvent: '',
    };
    this.getPastEvents = this.getPastEvents.bind(this);
    this.setCurrentReview = this.setCurrentReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const category = this.props.location.state.category;
    this.getPastEvents(category);

    if (this.props.location.state.reviewEvent) {
      const { _id } = this.props.location.state.reviewEvent;
      this.setCurrentReview(_id, this.props.location.state.reviewEvent);
    }
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

  setCurrentReview(eventId, event) {
    this.setState({ currentReviewEvent: event });

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
  }

  render() {
    const { events, currentReview, currentReviewEvent, category } = this.state;

    return (
      <div className="body">
        <div className="container-fluid contents">
          <div className="row justify-content-end">
            <div id="work-play-dropdown-col" className="col-lg-4">
              <div className="d-flex row justify-content-center">
                <div className="col-lg-10">
                  {/* work/play drop-down */}
                  <select className="form-control" value={this.state.category} onChange={this.handleChange}>
                    <option value="work">Work</option>
                    <option value="play">Play</option>
                  </select>
                </div>
              </div>
            </div> 
          </div>
          <div className="row justify-content-between">
            <div id="current-review" className="col-lg-8 white-container">
              {/* currently selected event's review */}
              <EventReview currentReview={currentReview} currentReviewEvent={currentReviewEvent} />
            </div>
            <div className="col-lg-4 white-container">
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
