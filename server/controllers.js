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
    const existingEvent = user.events.reduce((doesExist, e) => {
      if (e.title === event.title && e.description === event.description) {
        doesExist = true;
      }
      return doesExist;
    }, false);
    if (!existingEvent) {
      const newEvent = new db.IEvent({
        title: event.title || '',
        category: event.category || '',
        date: event.date || 'you will know when the time is right',
        description: event.description || '',
        isComplete: event.isComplete || false,
      });
      user.events.push(newEvent);
      await user.save();
    }
    callback(user);
  });
};

const updateEvent = async (id, event, callback) => {
  await db.User.findOne({ googleId: id }, async (err, user) => {
    user.events.forEach((e) => {
      if (e.description === event.description) {
        if (event.title) { e.title = event.title; }
        if (event.category) { e.category = event.category; }
        if (event.date) { e.date = event.date; }
        user.save();
      }
    });
    callback();
  });
};

const addReview = async (id, feedback, event, callback) => {
  await db.User.findOne({ googleId: id }, async (err, user) => {
    for (let i = 0; i < user.events.length; i++) {
      const e = user.events[i];
      if (e.description === event.description && e.title === event.title) {
        if (!e.isComplete) {
          const newFeedback = new db.Feedback({
            pros: feedback.pros.reduce((allPros, pro) => {
              allPros.push(pro);
              return allPros;
            }, []),
            cons: feedback.cons.reduce((allCons, con) => {
              allCons.push(con);
              return allCons;
            }, []),
            journal: feedback.journal,
          });
          e.feedback.push(newFeedback);
          e.isComplete = true;
          user.save();
          callback();
          return;
        }
      }
    }
  });
};

const getEmail = async (id, callback) => {
  await db.User.findOne({ googleId: id }, async (err, user) => {
    callback(user.email);
  });
};

module.exports.getEvents = getEvents;
module.exports.addEvent = addEvent;
module.exports.getEmail = getEmail;
module.exports.updateEvent = updateEvent;
module.exports.addReview = addReview;
