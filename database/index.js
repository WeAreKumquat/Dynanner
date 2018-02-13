const mongoose = require('mongoose');

const mongoURI = process.env.URI || 'mongodb://localhost/dynanner';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

const userSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
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
