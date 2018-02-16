import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PastEvents from '../pastEvents/index.jsx';
import DatePicker from 'react-bootstrap-date-picker';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'work',
      title: 'event',
      date: '2018-04-15',
      description: 'just do it',
      email: 'address@domainName.com',
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
        this.setState({
          email: emailUserCal
        });
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
  changeDate(event) {
    this.setState({
      date: event,
    });
  }
  render() {
    const { redirect } = this.state;
    return (
      <div className="body">
        <h1>Add an Event</h1>
        <div>
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
            <DatePicker id="example-datepicker" dateFormat="YYYY-MM-DD" value={this.state.date} onChange={this.changeDate}
              minDate="2018-02-16T12:00:00.000Z"
              maxDate="2118-01-01T12:00:00.000Z"
            />
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
        <iframe
          title="userCal"
          src="https://www.google.com/calendar/embed?height=600&amp;
          wkst=1&amp;bgcolor=%23FFFFFF&amp;
          src={this.state.email}&amp;
          color=%232952A3&amp;
          ctz=Europe%2FParis"
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
        />
        {redirect && (
          <Redirect to={'/pastEvents'} component={PastEvents} />
        )}
      </div>
    );
  }
}

export default AddEvent;
