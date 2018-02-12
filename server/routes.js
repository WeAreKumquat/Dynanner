const router = require('express').Router();
const request = require('request');
const passport = require('passport');
const GoogleStrategy = require('passport-google-auth').Strategy;
const controller = require('./controllers');

router.get('/', (req, res) => {});
router.get('/login', (req, res) => {});
router.get('/homepage', (req, res) => {});
router.get('/addEvent', (req, res) => {});
router.get('/pastEvents', (req, res) => {});
router.get('/reviewEvent', (req, res) => {});

router.post('/addEvent', (req, res) => {});
router.post('/reviewEvent');

module.exports = router;
