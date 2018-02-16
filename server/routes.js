const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const controller = require('./controllers');

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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/api/isAuthenticated', (req, res) => {
  const isLoggedIn = !!req.user;

  res.send(isLoggedIn);
});

router.get('/api/getCurrentUser', (req, res) => {
  res.send(req.user.firstName);
});

router.get('/api/upcomingEvents', (req, res) => {
  const currentUserId = req.user.googleId;
  // const currentUserId = req.query.googleId; // for testing in Postman
  controller.fetchUpcomingEvents(currentUserId, (error, events) => {
    if (error) {
      console.error(error);
    } else {
<<<<<<< HEAD
      res.send(events);
    }
  });
});

router.get('/api/pastEvents', (req, res) => {
  const currentUserId = req.user.googleId;
  // const currentUserId = req.query.googleId; // for testing in Postman
  controller.fetchPastEvents(currentUserId, (error, events) => {
    if (error) {
      console.error(error);
    } else {
=======
>>>>>>> c0c804cb9c485496641a8d8db006cb59155c7ecb
      res.send(events);
    }
  });
});

router.post('/api/addEvent', async (req, res) => {
  await controller.addEvent(req.user.googleId, req.body.event, () => {
    res.send();
  });
});

router.post('/api/updateEvent', async (req, res) => {
  await controller.updateEvent(req.user.googleId, req.body.event, () => {
    res.send();
  });
});

router.post('/api/addReview', async (req, res) => {
  await controller.addReview(req.user.googleId, req.body.feedback, req.body.event, () => {
    res.send();
  });
});

router.post('/api/removeEvent', (req, res) => {
  const currentUserId = req.user.googleId;
  const { eventId } = req.body;
  controller.removeEvent(currentUserId, eventId);
  res.end();
});

router.get('/api/getEmail', async (req, res) => {
  await controller.getEmail(req.user.googleId, (email) => {
    res.send(email);
  });
});

router.get('/api/getReview', (req, res) => {
  const currentUserId = req.user.googleId;
  // const currentUserId = req.query.googleId; // for testing in Postman
  const { eventId } = req.query;

  controller.fetchReview(currentUserId, eventId, (error, review) => {
    if (error) {
      console.error(error);
    } else {
      res.send(review);
    }
  });
});

module.exports = router;
