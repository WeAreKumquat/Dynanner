const mongoose = require('mongoose');

const mongoURI = process.env.URI || 'mongodb:localhost/dynanner';
mongoose.connect(mongoURI);

const userSchema = mongoose.Schema({
  googleId: { type: String, index: { unique: true, dropDups: true } },
  email: { type: String, index: { unique: true, dropDups: true } },
});
const feedbackSchema = mongoose.Schema({
  pros: String,
  cons: String,
  journal: String,
});
const eventSchema = mongoose.Schema({
  userId: { type: String, index: { unique: true, dropDups: true } },
  name: String,
  category: String,
  tag: String,
  feedback: [feedbackSchema],
  timestamp: Date,
});

const User = mongoose.model('User', userSchema);
const IEvent = mongoose.model('IEvent', eventSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports.User = User;
module.exports.IEvent = IEvent;
module.exports.Feedback = Feedback;
