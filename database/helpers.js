const db = require('./index');

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

module.exports.fetchUpcomingEvents = fetchUpcomingEvents;
