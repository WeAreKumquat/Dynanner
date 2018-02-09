/* global document */
import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Dynanner
        {/* Google auth */}
      </div>
    );
  }
}

ReactDOM.render(<Login />, document.getElementById('Login'));
