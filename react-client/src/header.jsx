import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a href="/"><h1 id="heading">Dynanner</h1></a>
            </div>
            <p className="navbar-text navbar-right">
              <a href="/logout" className="btn btn-outline-secondary">
                <span className="fa fa-sign-out" />  Log Out
              </a>
            </p>
          </div>
        </nav>
        <div>
          {React.cloneElement(this.props.children, this.props)}
          {/* {this.props.children} */}
        </div>
      </div>
    );
  }
}

export default Header;

