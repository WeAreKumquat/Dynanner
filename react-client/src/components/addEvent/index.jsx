import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PastEvents from '../pastEvents/index.jsx';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'play',
      title: 'event',
      date: '2018-02-15',
      description: 'just do it',
      email: 'address@domainName.com',
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getEmail = this.getEmail.bind(this);
  }

  componentDidMount() {
    this.getEmail();
  }
  getEmail() {
    axios.get('/api/getEmail')
      .then((email) => {
        const emailUserCal = email.replace('@', '%40');
        this.setState({
          email: emailUserCal
        });
      })
      .catch((error) => { console.log(`Error trying to get user's email: ${error}`); });
  }
  handleSubmit() {
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
  }
  handleChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value,
    });
  }
  render() {
    const { redirect } = this.state;
    return (
      <div className="body">
        <h1>Add an Event</h1>
        <div>
          <select name="category" onChange={this.handleChange}>
            <option value="work">work</option>
            <option value="play">play</option>
          </select>
          <br />
          <div>
            Title: &ensp;
            <input type="text" onChange={this.handleChange} name="title" />
          </div>
          <br />
          <div>
            Date: &ensp;
            <input type="text" onChange={this.handleChange} name="date" />
          </div>
          <br />
          <div>
            Description: &ensp;
            <input type="text" onChange={this.handleChange} name="description" />
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
