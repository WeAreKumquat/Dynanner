const request = require('request');
const db = require('../database/index');

const getEvents = async (token, callback) => {
  const options = {
    method: 'GET',
    url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    qs: {
      access_token: token, singleEvents: true, orderBy: 'startTime',
    },
  };
  await request(options, (error, response, body) => {
    if (error) { console.log(`Error regarding GET request to google-calendar API: ${error}`); }
    callback(body);
  });
};

const addEvent = async (id, event, callback) => {
  await db.User.findOne({ googleId: id }, async (err, user) => {
    const existingEvent = await db.IEvent.findOne({ description: event.description });
    if (!existingEvent) {
      const newEvent = new db.IEvent({
        title: event.title || '',
        category: event.category || '',
        tag: event.tag || '',
        description: event.description || '',
        timeStart: event.timeStart || new Date(),
        isComplete: event.isComplete || false,
      });
      await newEvent.save();
      user.events.addToSet(newEvent);
      await user.save();
    }
    callback('done');
  });
};

module.exports.getEvents = getEvents;
module.exports.addEvent = addEvent;
