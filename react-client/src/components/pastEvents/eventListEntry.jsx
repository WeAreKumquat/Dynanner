import React from 'react';

class EventListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // pass clicked event's id into setCurrentReview
    const { setCurrentReview, event } = this.props;

    setCurrentReview(event._id, event.title);
    console.log(event);
  }

  render() {
    const { title } = this.props.event;

    return (
      <button type="button" className="list-group-item list-group-item-action" onClick={this.handleClick}>
        {/* date */}
        {/* event list entry name */}
        <h6>{title}</h6>
      </button>
    );
  }
}

export default EventListEntry;
