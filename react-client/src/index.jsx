/* global document */
import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/index.jsx';
import Header from './header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.getAuth = this.getAuth.bind(this);
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    // send GET to server to check if there is an authenticated user
    Axios.get('/api/isAuthenticated')
      .then((response) => {
        this.setState({ isAuthenticated: response.data });
      })
      .catch((error) => {
        console.error('authentication error', error);
      });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Login />;
    } else if (this.state.isAuthenticated) {
      return <Header />;
    }
    return (
      <Switch>
        <Route path="/" component={Header} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}

ReactDOM.render((<Router><App /></Router>), document.getElementById('app'));
