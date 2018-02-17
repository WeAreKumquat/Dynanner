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
    this.deletePro = this.deletePro.bind(this);
    this.deleteCon = this.deleteCon.bind(this);
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
  addPro() {
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
  deletePro(event) {
    this.setState({
      pros: this.state.pros.filter(pro => pro !== event.target.value),
    });
  }
  deleteCon(event) {
    this.setState({
      cons: this.state.cons.filter(con => con !== event.target.value),
    });
  }
  render() {
    return (
      <div className="body reviewEvent">
        <div className="form reviewForm col-5">
          <h2 className="reviewFormHeading">{this.props.location.state.event.title}</h2>
          
          <div className="form-group">
          
            Things You Did Well: <br />
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button className="btn btn-secondary" type="submit" onClick={this.addPro}>save this entry</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="sr-only">Pros</span>
                </button>
                <div className="dropdown-menu">
                  {this.state.pros.map((pro, i, pros) => (
                    <div className= "dropdown-item" key={i}>
                      {pro}
                      <button className="btn-outline-secondary deleteProsCons" type="submit" value={pros[i]} onClick={this.deletePro}>delete</button>
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="text"
                className="form-control col-4"
                aria-label="Text input with segmented dropdown button"
                name="proEntry"
                onChange={this.handleChange}
                ref="pro"
              />
            </div>

          </div>
          <div className="form-group">
            Things You Did Poorly<br />
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button className="btn btn-secondary" type="submit" onClick={this.addCon}>save this entry</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="sr-only">Cons</span>
                </button>
                <div className="dropdown-menu">
                  {this.state.cons.map((con, i, cons) => (
                    <div className="dropdown-item" key={i}>
                      {con}
                      <button className="btn-outline-secondary deleteProsCons" type="submit" value={cons[i]} onClick={this.deleteCon}>delete</button>
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="text"
                className="form-control col-4"
                aria-label="Text input with segmented dropdown button"
                name="conEntry"
                onChange={this.handleChange}
                ref="con"
              />
            </div>
          
          </div>
          
          <div className="form-group">
            Further Reflections <br />
            <textarea className="col-7" type="text" name="journal" onChange={this.handleChange} ref="journal" />
          </div>

          <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Submit</button>
          
          {this.state.redirect && (
            <Redirect to="/" />
          )}
        
        </div>
      </div>
    );
  }
}

export default ReviewEvent;
