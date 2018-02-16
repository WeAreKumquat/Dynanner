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
    if (err) {
      callback(err);
    } else {
      const reviewedEvent = user.events.id(event._id);
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
      reviewedEvent.feedback.push(newFeedback);
      reviewedEvent.isComplete = true;
      user.save();
      callback(null);
    }
  });
};

const removeEvent = (currentUserId, eventId) => {
  db.User.findOne({ googleId: currentUserId }, (error, user) => {
    if (error) {
      throw error;
    } else {
      user.events.id(eventId).remove();
      user.save((err) => {
        if (err) {
          throw err;
        } else {
          console.log('event removed!');
        }
      });
    }
  });
};

const getEmail = async (id, callback) => {
  await db.User.findOne({ googleId: id }, async (err, user) => {
    callback(user.email);
  });
};

const fetchUpcomingEvents = (currentUserId, callback) => {
  // find user model that matches current user's google ID
  db.User.findOne({ googleId: currentUserId }, (error, user) => {
    if (error) {
      callback(error, null);
    } else {
      // go into their events sub-collection and find all events where isComplete: false
      const events = user.events.filter(event => event.isComplete === false);
      callback(null, events);
    }
  });
};

const fetchPastEvents = (currentUserId, category, callback) => {
  // find user model that matches current user's google ID
  db.User.findOne({ googleId: currentUserId }, (error, user) => {
    if (error) {
      callback(error, null);
    } else {
      // go into their events sub-collection and find all events where isComplete: true
      // if there is a category, account for that
      // otherwise, just fetch all events
      let events;
      if (category) {
        events = user.events.filter(event => ((event.isComplete === true) && (event.category === category)));
        callback(null, events);
      } else {
        events = user.events.filter(event => event.isComplete === true);
        callback(null, events);
      }
    }
  });
};

const fetchReview = (currentUserId, eventId, callback) => {
  db.User.findOne({ googleId: currentUserId }, (error, user) => {
    if (error) {
      callback(error, null);
    } else {
      const review = user.events.id(eventId).feedback[0];
      callback(null, review);
    }
  });
};

module.exports.getEvents = getEvents;
module.exports.addEvent = addEvent;
module.exports.getEmail = getEmail;
module.exports.updateEvent = updateEvent;
module.exports.addReview = addReview;
module.exports.removeEvent = removeEvent;
module.exports.fetchUpcomingEvents = fetchUpcomingEvents;
module.exports.fetchPastEvents = fetchPastEvents;
module.exports.fetchReview = fetchReview;
