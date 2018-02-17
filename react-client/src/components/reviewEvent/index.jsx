import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ReviewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pros: [],
      proEntry: 'this went well',
      cons: [],
      conEntry: 'do not make the same mistake twice',
      journal: 'a detailed journey inside my emotional experience',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPro = this.addPro.bind(this);
    this.addCon = this.addCon.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  }
  handleSubmit() {
    axios.post('/api/addReview', {
      event: this.props.location.state.event,
      feedback: {
        pros: this.state.pros,
        cons: this.state.cons,
        journal: this.state.journal,
      },
    })
      .then((response) => {
        console.log(`Successful axios post reviewEvent: ${response}`);
        this.refs.journal.value = '';
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(`Error from axios post reviewEvent: ${error}`);
      });
  }
  addPro(event) {
    this.setState({
      pros: this.state.pros.concat(this.state.proEntry),
    });
    this.refs.pro.value = '';
  }
  addCon() {
    this.setState({
      cons: this.state.cons.concat(this.state.conEntry),
    });
    this.refs.con.value = '';
  }
  render() {
    return (
      <div className="body">
        <div className="form">
          <h2>{this.props.location.state.event.title}</h2>
          <div className="form-group">
            Things You Did Well: <br />
            <input type="text" name="proEntry" onChange={this.handleChange} ref="pro" />
            <button type="submit" onClick={this.addPro}>save this entry</button>
          </div>
          <div className="form-group">
            Things You Did Poorly<br />
            <input type="text" name="conEntry" onChange={this.handleChange} ref="con" />
            <button type="submit" onClick={this.addCon}>save this entry</button>
          </div>
          <div className="form-group">
            Further Reflections <br />
            <textarea type="text" name="journal" onChange={this.handleChange} ref="journal" />
          </div>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
          {this.state.redirect && (
            <Redirect to="/" />
          )}
        </div>
      </div>
    );
  }
}

export default ReviewEvent;
