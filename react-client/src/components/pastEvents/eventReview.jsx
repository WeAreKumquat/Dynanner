import React from 'react';

class EventReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        {/* event name */}
        {/* event date */}
        {/* pros */}
        <h5>Pros:</h5>
        <br />
        {/* cons */}
        <h5>Cons:</h5>
        <br />
        {/* journal */}
        <h5>Journal:</h5>
      </div>
    );
  }
}

export default EventReview;
