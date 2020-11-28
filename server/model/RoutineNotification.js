const mongoose = require('mongoose');

const routineNotification = new mongoose.Schema({
    routineId: {
        type: String,
        required: true
    },
    routineName: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('RoutineNotification', routineNotification);
