const Routine = require('../model/Routine');
const RoutineNotification = require('../model/RoutineNotification');
const {getCurrentDay, getCurrentTime} = require('../utils/date-parser.js')

const sendTodaysRoutineEvents = async socket => {
  try {
    const now = new Date();
    const currentDay = getCurrentDay();
    const routines = await Routine.find({
      days: {$in: currentDay},
      userEmail: {$ne: null}
    });
    for (const routine of routines) {
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const routineNotification = await RoutineNotification.findOne({
        routineId: routine._id,
        created: {$gte: startOfToday}
      })
      if (!routineNotification) {
        socket.emit(`routine-notification/${routine.userEmail}`, routine);
        const newRoutineNotification = new RoutineNotification({
          routineId: routine._id,
          routineName: routine.name,
          created: new Date(),
          userEmail: routine.userEmail,
        })
        console.log('Saving new routine notification', newRoutineNotification)
        await newRoutineNotification.save();
      }
    }
  } catch (error) {
    console.error("Error ", error);
  }
};

exports.sendTodaysRoutineEvents = sendTodaysRoutineEvents;
