import React from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import UpcomingEvents from './upcomingEvents.jsx';
import PastEvents from './pastEvents.jsx';
import AddEvent from '../addEvent/index.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
    };
  }

  componentDidMount() {
    Axios.get('/getCurrentUser')
      .then((response) => {
        this.setState({currentUser: response.data});
      })
      .catch((error) => {
        console.error('error getting current user', error);
      });
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="body">
        <h3>Welcome back, {currentUser}!</h3>
        <Link to="/addEvent" className="btn btn-outline-secondary">
          <span className="fa fa-plus" />  Add New Event
        </Link>
        <UpcomingEvents />
        <PastEvents />
      </div>
    );
  }
}

export default Home;
