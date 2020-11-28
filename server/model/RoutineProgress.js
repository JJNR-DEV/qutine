const mongoose = require('mongoose');

const routineProgress = new mongoose.Schema({
    routineId: {
        type: String,
        required: true
    },
    routineName: {
        type: String,
        required: true
    },
    daysComplete: {
        type: Number,
        default: 0
    },
    daysIncomplete: {
        type: Number,
        default: 0
    },
    userEmail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('RoutineProgress', routineProgress);
