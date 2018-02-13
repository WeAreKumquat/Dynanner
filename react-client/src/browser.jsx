/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/homepage/index';

ReactDOM.render(<Home {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));

