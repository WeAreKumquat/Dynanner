const express = require('express');
const routes = require('./routes');
const path = require('path');
const reactEngine = require('react-engine');

const app = express();
const pathway = path.join(__dirname, '/../react-client/dist');
app.use(express.static(pathway));

const engine = reactEngine.server.create({
  routes: path.join(__dirname, '/../react-client/src/routes.jsx'),
});

app.engine('jsx', engine);

app.set('views', path.join(__dirname, '/../react-client/src'));

app.use('/', routes);

module.exports = app;
