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
  scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/calendar'],
}, async (accessToken, refreshToken, params, profile, done) => {
  try {
    // check whether current user exists in db
    const existingUser = await db.User.findOne({ googleId: profile.id });
    let newUser = null;
    // create new user if current user is not in db
    if (!existingUser) {
      newUser = new db.User({
        token: refreshToken,
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        firstName: profile.name.givenName,
      });
      await newUser.save();
    } else {
      await db.User.findOne({ googleId: profile.id }, (err, user) => {
        user.token = refreshToken;
        user.save();
      });
    }
    // get events from google calendar
    await controller.getEvents(accessToken, (events) => {
      const calEvents = JSON.parse(events).items.slice(-5);
      calEvents.forEach(async (event) => {
        await controller.addEvent(profile.id, {
          title: event.summary,
          description: event.description,
          date: event.start.dateTime,
        }, () => {});
      });
    });
    if (existingUser) {
      return done(null, existingUser);
    }
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

app.use('/', routes);

module.exports = app;
