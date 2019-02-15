const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price_quote: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Event', eventSchema);
