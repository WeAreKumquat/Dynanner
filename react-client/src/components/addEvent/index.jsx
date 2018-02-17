import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PastEvents from '../pastEvents/index.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'work',
      title: 'event',
      // date: {},
      description: 'just do it',
      calSrc: '',
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    this.getEmail();
  }
  getEmail() {
    axios.get('/api/getEmail')
      .then((email) => {
        const emailUserCal = email.data.replace('@', '%40');
        const calSrc = `https://calendar.google.com/calendar/embed?src=${emailUserCal}&ctz=America%2FChicago`;
        this.setState({ calSrc });
      })
      .catch((error) => { console.log(`Error trying to get user's email: ${error}`); });
  }
  handleSubmit() {
    if (this.state.date) {
      this.refs.title.value = '';
      this.refs.description.value = '';
      axios.post('/api/addEvent', {
        event: {
          category: this.state.category,
          title: this.state.title,
          date: this.state.date,
          description: this.state.description,
        },
      })
        .then(() => {
          // trigger redirect to '/pastEvents'
          this.setState({ redirect: true });
        })
        .catch((error) => {
          console.log(`Error from axios post addEvent: ${error}`);
        });
    } else {
      alert('Date needs to be between 2018 and 2118. Please select a valid date and re-submit the event.');
    }
  }
  handleChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value,
    });
  }
  changeDate(date) {
    this.setState({ date });
  }
  render() {
    const { redirect, calSrc } = this.state;
    return (
      <div className="body">
        <h1>Add an Event</h1>
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-4">
              <select name="category" onChange={this.handleChange} value={this.state.category}>
                <option value="work">work</option>
                <option value="play">play</option>
              </select>
              <br />
              <div>
                Title: &ensp;
                <input type="text" onChange={this.handleChange} name="title" ref="title" />
              </div>
              <br />
              <div>
                Date: &ensp;
                <DatePicker selected={this.state.date} onChange={this.changeDate} />
              </div>
              <br />
              <div>
                Description: &ensp;
                <input type="text" onChange={this.handleChange} name="description" ref="description" />
              </div>
              <br />
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
            <div className="col-md-6 col-lg-8">
              <iframe title="user-calendar" src={calSrc} width="800" height="600" frameBorder="0" scrolling="no" />
            </div>
          </div>
        </div>
        {redirect && (
          <Redirect to={{ pathname: '/pastEvents', state: { category: this.state.category } }} component={PastEvents} />
        )}
      </div>
    );
  }
}

export default AddEvent;
