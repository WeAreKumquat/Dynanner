import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/homepage/index.jsx';
import AddEvent from './components/addEvent/index.jsx';
import PastEvents from './components/pastEvents/index.jsx';
import ReviewEvent from './components/reviewEvent/index.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Switch>
            <Route path="/addEvent" component={AddEvent} />
            <Route path="/pastEvents" component={PastEvents} />
            <Route path="/reviewEvent" component={ReviewEvent} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Header;

