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
    failureRedirect: '/',
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
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

router.get('/getCurrentUser', (req, res) => {
  res.send(req.user.firstName);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/api/upcomingEvents', (req, res) => {
  const currentUserId = req.user.googleId;
  // const currentUserId = req.query.googleId; // for testing in Postman
  db.fetchUpcomingEvents(currentUserId, (error, events) => {
    if (error) {
      console.error(error);
    } else {
      console.log(events);
      res.send(events);
    }
  });
});

router.post('/api/addEvent', async (req, res) => {
  await controller.addEvent(req.user.googleId, req.body.event, (newEvent) => {
    console.log(newEvent);
    res.send(newEvent);
  });
});

router.post('/api/updateEvent', async (req, res) => {
  await controller.updateEvent(req.user.googleId, req.body.event, (newEvent) => {
    console.log(newEvent);
    res.send(newEvent);
  });
});

router.get('/api/getEmail', async (req, res) => {
  await controller.getEmail(req.user.googleId, (email) => {
    res.send(email);
  });
});

module.exports = router;
