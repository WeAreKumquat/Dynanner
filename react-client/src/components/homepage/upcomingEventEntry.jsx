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
    const id = `#${title}`;

    return (
      <div className="card upcoming-event-entry">
        <div className="card-header" id="headingOne">
          <div className="row justify-content-end date-row">
            {moment(date).isValid() ? <small className="upcoming-date">{moment(date).format('dddd, MMMM Do')}</small> : <small className="upcoming-date">{date}</small>}
          </div>
          <div className="row justify-content-between">
            <span>
              <h5 className="mb-0">
                <Link to={{pathname: "/reviewEvent", state: {event: this.props.event}}} className="upcoming-event-glyph">
                  <span className="fa fa-check" />
                </Link>    
                <button className="btn btn-link collapsed upcoming-event-text" data-toggle="collapse" data-target={id} aria-expanded="false" aria-controls="collapseOne">
                  <h5 className="mb-0">
                    {title}
                  </h5>
                </button>
              </h5>
            </span>
            <h5 className="mb-0 trashcan">
              <a href="/" onClick={this.deleteEvent} className="upcoming-event-glyph">
                <span className="fa fa-trash-alt" />
              </a>
            </h5>
          </div>
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
