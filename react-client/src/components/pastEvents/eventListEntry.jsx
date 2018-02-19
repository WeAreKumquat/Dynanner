import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class EventListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // pass clicked event's id into setCurrentReview
    const { setCurrentReview, event } = this.props;

    setCurrentReview(event._id, event);
  }

  render() {
    const { title, date, category } = this.props.event;

    return (
      <Link to={{ pathname: '/pastEvents', state: {category: category} }} className="list-group-item list-group-item-action flex-column align-items-start past-event-entry" onClick={this.handleClick}>
        <div className="d-flex w-100 justify-content-end">
          {/* date */}
          <small className="date-row">{moment(date).format('dddd, MMMM Do')}</small>
        </div>
        {/* event list entry name */}
        <h6>{title}</h6>
      </Link>
    );
  }
}

export default EventListEntry;
