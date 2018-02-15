import React from 'react';
import Axios from 'axios';
import UpcomingEvents from './upcomingEvents';
import PastEvents from './pastEvents';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currentUser, currentUserId } = this.props;
    return (
      <div className="body">
        <h3>Welcome back, {currentUser}!</h3>
        <a href="/addEvent" className="btn btn-outline-secondary">
          <span className="fa fa-plus" />  Add New Event
        </a>
        <UpcomingEvents currentUserId={currentUserId} />
        <PastEvents />
      </div>
    );
  }
}

export default Home;
