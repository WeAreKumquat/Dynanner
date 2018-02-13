const express = require('express');
const routes = require('./routes');
const path = require('path');
const reactEngine = require('react-engine');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('../database/index');
const dotenv = require('dotenv').config();

const app = express();
const pathway = path.join(__dirname, '/../react-client/dist');
app.use(express.static(pathway));

const engine = reactEngine.server.create({
  routes: path.join(__dirname, '/../react-client/src/routes.jsx'),
});

app.engine('jsx', engine);

app.set('views', path.join(__dirname, '/../react-client/src'));

app.use(cookieParser());
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
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
  console.log('accessToken ', accessToken);
  console.log('refreshToken ', refreshToken);
  console.log('profile ', profile);
  try {
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
    });
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));
app.use('/', routes);

module.exports = app;
