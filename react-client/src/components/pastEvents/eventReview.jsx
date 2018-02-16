import React from 'react';

class EventReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pros, cons, journal } = this.props.currentReview;

    return (
      <div>
        {/* event name */}
        {/* event date */}
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
