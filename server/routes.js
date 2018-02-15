const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const controller = require('./controllers');
const db = require('../database/helpers');

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope:
      ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read',
        'https://www.googleapis.com/auth/calendar'],
    prompt: 'consent',
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

// allows user to refresh page but gets rid of React component functionality?
// router.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'), (error) => {
//     if (error) {
//       res.status(500).send(error);
//     }
//   });
// });

router.get('/isAuthenticated', (req, res) => {
  const isLoggedIn = !!req.user;

  res.send(isLoggedIn);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/api/upcomingEvents', (req, res) => {
  const currentUserId = req.user.googleId;
  // const currentUserId = req.query.googleId; // for testing in Postman
  db.fetchUpcomingEvents(currentUserId, (error, events) => {
    if (error) {
      console.error(error);
    } else {
      res.send(events);
    }
  });
});

router.post('/api/addEvent', (req, res) => {});

router.post('/api/addEvent', async (req, res) => {
  await controller.addEvent(req.user.googleId, req.body.event, (newEvent) => {
    console.log(newEvent);
    res.redirect('/pastEvents');
  });
});

router.post('/api/reviewEvent', (req, res) => {});

module.exports = router;
