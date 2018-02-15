const request = require('request');
const db = require('../database/index');

const getEvents = async (token, callback) => {
  const options = {
    method: 'GET',
    url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    qs: {
      access_token: token, maxResults: 5, singleEvents: true, orderBy: 'startTime',
    },
  };
  await request(options, (error, response, body) => {
    if (error) { console.log(`Error regarding GET request to google-calendar API: ${error}`); }
    callback(body);
  });
};

const addEvent = (id, event, callback) => {
  db.User.findOne({ googleId: id }, async (err, user) => {
    const newEvent = new db.IEvent({
      title: event.title || '',
      category: event.category || '',
      tag: event.tag || '',
      description: event.description || '',
      timeStart: event.timeStart || new Date(),
      isComplete: event.isComplete || false,
    });
    user.events.push(newEvent);
    await user.save();
    callback(newEvent);
  });
};

module.exports.getEvents = getEvents;
module.exports.addEvent = addEvent;
