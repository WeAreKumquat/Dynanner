import React from 'react';
import Axios from 'axios';
import { Route, Link } from 'react-router-dom';
import UpcomingEvents from './upcomingEvents.jsx';
import PastEventsHome from './pastEvents.jsx';
import AddEvent from '../addEvent/index.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
    };
  }

  componentDidMount() {
    Axios.get('/api/getCurrentUser')
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
        <h3 id="welcome">Welcome back, {currentUser}!</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="row justify-content-center">
                <div className="col-lg-4 align-self-center">
                  <Link to="/addEvent" className="btn btn-outline-info btn-lg btn-block" id="add-event-button">
                    <span className="fa fa-plus" /> Add New Event
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-eq-height justify-content-between">
            <div id="upcoming-col" className="col-lg-8">
              <UpcomingEvents />
            </div>
            <div className="col-lg-4"  id="past-logs-home">
              <PastEventsHome />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
