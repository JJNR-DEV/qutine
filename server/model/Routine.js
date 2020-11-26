const mongoose = require('mongoose');

const arrayValidation = days => {
  if (days.length === 0) return false;
  if (days.length > 7) return false;
  return true;
}

const routineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 55
  },
  category: {
    type: String,
    required: true,
    min: 2,
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
      type: [{
        type: String
      }],
      required: true,
      validate: [arrayValidation, 'Days selected are not correct']
  }
});

module.exports = mongoose.model('Routine', routineSchema);
