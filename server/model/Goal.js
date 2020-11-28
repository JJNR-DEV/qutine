const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 55
  },
  category: {
    type: String,
    required: true,
    min: 6,
    max: 55
  },
  amountOfTimes: {
    type: String,
    required: false,
    min: 0,
    max: 4
  },
  counterAmount: {
    type: Number,
    required: false,
    min: 0,
    max: 4
  },
  userEmail: {
    type: String,
    required: true,
    min: 4,
    max: 100
  }
});

module.exports = mongoose.model('Goal', goalSchema);
