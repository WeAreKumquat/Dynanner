// passes initial state to Header component from server: https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c

/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
// import Home from './components/homepage/index';
import Header from './header';

ReactDOM.hydrate(<Header {...window.APP_INITIAL_STATE} />, document.getElementById('root'));

