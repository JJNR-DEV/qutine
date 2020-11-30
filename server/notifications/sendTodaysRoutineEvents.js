const Routine = require('../model/Routine');
const RoutineNotification = require('../model/RoutineNotification');
const {getCurrentDay, getCurrentTime} = require('../utils/date-parser.js');
const {DateTime} = require('luxon');

const sendTodaysRoutineEvents = async (socket) => {
  try {
    const now = new Date();
    const currentDay = getCurrentDay();
    const routines = await Routine.find({
      days: {$in: currentDay},
      userEmail: {$ne: null}
    }).exec();
    const currentHours = DateTime.local()
      .setLocale("fr")
      .toLocaleString(DateTime.TIME_SIMPLE);
    for (const routine of routines) {
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const routineNotification = await RoutineNotification.findOne({
        routineId: routine._id,
        created: {$gte: startOfToday}
      }).exec();

      // const currentHours = DateTime.local().toFormat("T");
      const startTime = routine.startTime;

      if (!routineNotification && currentHours === routine.startTime) {
        console.log("currentHours: " + currentHours + " futureHours: " + startTime);
        console.log("Found match for routine " + routine.name);
        socket.emit(`routine-notification/${routine.userEmail}`, routine);
        const newRoutineNotification = new RoutineNotification({
          routineId: routine._id,
          routineName: routine.name,
          created: new Date(),
          userEmail: routine.userEmail,
        });
        await newRoutineNotification.save();
        // console.log("Sent notification", newRoutineNotification);
      }
    }
  } catch (error) {
    console.error("Error ", error);
  }
};

exports.sendTodaysRoutineEvents = sendTodaysRoutineEvents;
