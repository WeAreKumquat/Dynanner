const router = require('express').Router();
const request = require('request');
const passport = require('passport');
const controller = require('./controllers');

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
    successRedirect: '/react-client/src/components/homepage/index.jsx',
    failureRedirect: '/react-client/src/components/login/index.jsx',
  }),
);
router.get('/', (req, res) => {
  res.redirect('http://localhost:3000/auth/google/callback');
  res.render('react-client/src/components/login/index.jsx');
});
router.get('/login', (req, res) => {
  res.render('react-client/src/components/login/index.jsx');
});
router.get('/homepage', (req, res) => {
  res.render('react-client/src/components/homepage/index.jsx');
});
router.get('/addEvent', (req, res) => {});
router.get('/pastEvents', (req, res) => {});
router.get('/reviewEvent', (req, res) => {});
router.post('/addEvent', (req, res) => {});
router.post('/reviewEvent');

module.exports = router;
