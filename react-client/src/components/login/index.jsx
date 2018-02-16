import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-center"> 
          <div className="col align-self-center">
            <h1 id="login-heading">Dynanner</h1>
            {/* Google auth login */}
            <a href="/auth/google" className="btn btn-outline-info">
              <span className="fab fa-google-plus-g" />  Log In
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
