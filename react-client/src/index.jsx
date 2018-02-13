/* global document */
import React from 'react';
import Axios from 'axios';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    Axios.get('/');
  }

  render() {
    return (
      <div>
        Dynanner
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));
export default App;

