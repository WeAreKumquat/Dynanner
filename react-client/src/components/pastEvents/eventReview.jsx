import React from 'react';

class EventReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { currentReview, currentReviewEvent } = this.props;
    const { pros, cons, journal } = currentReview;
    const { title, description, date } = currentReviewEvent;

    return (
      <div>
        {/* event name */}
        <h3>{title}</h3>
        <br />
        {/* event date */}
        {/* event description */}
        {/* pros */}
        <h5>Pros:</h5>
        <ul>
          {pros && pros.map(pro => <li>{pro}</li>)}
        </ul>
        <br />
        {/* cons */}
        <h5>Cons:</h5>
        <ul>
          {cons && cons.map(con => <li>{con}</li>)}
        </ul>
        <br />
        {/* journal */}
        <h5>Journal:</h5>
        <p>{journal}</p>
      </div>
    );
  }
}

export default EventReview;
