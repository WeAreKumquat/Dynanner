const express = require('express');
const routes = require('./routes');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../database/index');
const dotenv = require('dotenv').config();
const controller = require('./controllers');

const app = express();
const pathway = path.join(__dirname, '/../react-client/dist');
app.use(express.static(pathway));
app.use(cookieParser('wearekumquat'));
app.use(session({ secret: 'wearekumquat' }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    // get events from google calendar
    controller.getEvents(accessToken, (events) => {
      const calEvents = JSON.parse(events);
      calEvents.items.forEach((event) => {
        // console.log(event);
        // console.log(event.summary);
        // console.log(event.description);
        // console.log(event.start.date || event.start.dateTime);
      });
    });
    // check whether current user exists in db
    const existingUser = await db.User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    // create new user if current user is not in db
    const newUser = new db.User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      firstName: profile.name.givenName,
    });
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

app.use('/', routes);

module.exports = app;
