import React from 'react';
import Axios from 'axios';
import EventListEntry from './eventListEntry.jsx';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      category: this.props.categorySelected,
    };
    this.getPastEvents = this.getPastEvents.bind(this);
  }

  componentDidMount() {
    this.getPastEvents();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ category: nextProps.categorySelected });
    this.getPastEvents();
  }

  getPastEvents() {
    console.log('getting past events');
    const { category } = this.state;

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

    // Axios.get('/api/pastEvents')
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({ events: response.data });
    //   })
    //   .catch((error) => {
    //     console.error('past event error', error);
    //   });
  }

  render() {
    const { events } = this.state;
    const { setCurrentReview } = this.props;

    return (
      <div>
        <h4>Your Past Events</h4>
        <ul className="list-group">
          {events.map((event, i) => (
            <EventListEntry event={event} key={i} setCurrentReview={setCurrentReview} />
          ))}
        </ul>
      </div>
    );
  }
}

export default EventsList;
