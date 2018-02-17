import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

class UpcomingEventEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent() {
    // send POST to /deleteEvent with current event's id to delete it from database
    Axios.post('/api/removeEvent', {
      eventId: this.props.event._id,
    })
      .then((response) => {
        console.log('your event was deleted!', response);
      })
      .catch((error) => {
        console.error('error deleting event!', error);
      });
  }

  render() {
    const { title, description, date } = this.props.event;
    const displayDate = moment.unix(+date);
    const id = `#${title}`;

    return (
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <Link to={{pathname: "/reviewEvent", state: {event: this.props.event}}} >
              <span className="fa fa-check" />
            </Link>
            <button className="btn btn-link collapsed" data-toggle="collapse" data-target={id} aria-expanded="false" aria-controls="collapseOne">
              {title}
            </button>
            <a href="/" onClick={this.deleteEvent}>
              <span className="fa fa-trash-alt" />
            </a>
          </h5>
          {moment(date).isValid() ? <small>{moment(date).calendar()}</small> : <small>{date}</small>}
        </div>

        <div id={title} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div className="card-body">
            {description}
          </div>
        </div>
      </div>
    );
  }
}

export default UpcomingEventEntry;
