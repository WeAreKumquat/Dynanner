const mongoose = require('mongoose');

const mongoURI = process.env.URI || 'mongodb://localhost/dynanner';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

const feedbackSchema = mongoose.Schema({
  pros: String,
  cons: String,
  journal: String,
});

const eventSchema = mongoose.Schema({
  title: String,
  category: String,
  tag: String,
  description: { type: String, index: true, unique: true },
  feedback: [feedbackSchema],
  timeStart: Date,
  timeEnd: Date,
  isComplete: Boolean,
}, {
  usePushEach: true,
});

const userSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  firstName: String,
  events: [eventSchema],
}, {
  usePushEach: true,
});

const User = mongoose.model('User', userSchema);
const IEvent = mongoose.model('IEvent', eventSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports.User = User;
module.exports.IEvent = IEvent;
module.exports.Feedback = Feedback;
