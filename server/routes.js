import App from '../react-client/src/index';
import Login from '../react-client/src/components/login/index';
import Home from '../react-client/src/components/homepage/index';
import template from '../react-client/template';

const router = require('express').Router();
const request = require('request');
const passport = require('passport');
const controller = require('./controllers');
const React = require('react');
const { renderToString } = require('react-dom/server');

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope:
      ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read',
        'https://www.googleapis.com/auth/calendar'],
  }),
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/react-client/src/components/homepage/index.jsx',
    successRedirect: '/homepage',
    // failureRedirect: '/react-client/src/components/login/index.jsx',
    failureRedirect: '/login',
  }),
);
router.get('/', (req, res) => {
  // res.redirect('http://localhost:3000/auth/google/callback');
  const isLoggedIn = !!req.user;

  if (isLoggedIn) {
    res.redirect('/homepage');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  console.log('ME!!!', req.user);
  
  const isLoggedIn = !!req.user;
  if (isLoggedIn) {
    res.redirect('/homepage');
  } else {
    const appString = renderToString(React.createElement(Login));
    res.send(template({
      body: appString,
      title: 'Welcome to Dynanner',
    }));
  }
});

router.get('/homepage', (req, res) => {
  const isLoggedIn = !!req.user;
  if (isLoggedIn) {
    const initialState = req.user.username;
    const appString = renderToString(React.createElement(Home, initialState));
    res.send(template({
      body: appString,
      title: 'Your Dynanner',
      initialState: JSON.stringify(initialState),
    }));
  } else {
    res.redirect('/login');
  }
});

router.get('/addEvent', (req, res) => {});
router.get('/pastEvents', (req, res) => {});
router.get('/reviewEvent', (req, res) => {});
router.post('/addEvent', (req, res) => {});
router.post('/reviewEvent');

module.exports = router;
