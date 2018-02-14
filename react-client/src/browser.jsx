// passes initial state to Home component from server: https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c

/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/homepage/index';

ReactDOM.render(<Home {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));

