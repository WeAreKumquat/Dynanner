/* global document */
import React from 'react';
// import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
      <div>
        Dynanner
        {/* Google auth */}
        <button className="btn btn-outline-secondary">
          <a href="/auth/google">
            <span className="fa fa-google-plus" />
            Log In
          </a>
        </button>
      </div>
    );
  }
}

// ReactDOM.render(<Login />, document.getElementById('Login'));
export default Login;

