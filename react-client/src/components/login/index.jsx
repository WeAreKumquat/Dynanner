import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="flex-column align-items-center">
              <a href="/">
                <h1 id="login-heading" className="display-2">Dynanner</h1>
              </a>
              <h5 className="text-center">
                The Dynamic Journal-Planner
              </h5>
              {/* Google auth login */}
              <a href="/auth/google" className="btn btn-outline-info btn-block">
                <span className="fab fa-google-plus-g" />  Log In with Google
              </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;
