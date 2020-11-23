const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
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
  startTime: {
    type: String,
    required: true,
    min: 4,
    max: 4
  },
  duration: {
    type: String,
    required: false,
    min: 0,
    max: 4
  },
  days: {
      type: [],
      required: true,
      min: 1,
      max: 7
  }
});

module.exports = mongoose.model('Routine', routineSchema);
