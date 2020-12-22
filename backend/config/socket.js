const socketIO = require('socket.io');
const {DateTime} = require('luxon');
const {getCurrentDay} = require("../utils/date-parser");
const INDEX = '../index.html';
const Routine = require('../model/Routine');
const RoutineNotification = require('../model/RoutineNotification');
const logger = require('./logger');

function createSocket(app, server) {
  let io;
  if (process.env.QUTINE_ENV === 'PRODUCTION') {
    app.use((req, res) => res.sendFile(INDEX, {root: path.join(__dirname + '/../frontend/build/')}));
    io = socketIO(server);
  } else {
    io = socketIO(server, {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT"]
      }
    });
  }

  let interval;

  io.on("connection", async (socket) => {
    logger.info("Socket.io connection established.");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(async () => await sendNotification(socket), 10000);
    socket.on("disconnect", async () => {
      logger.info("Socket.io client disconnected.");
      clearInterval(interval);
    });
  });

  const sendNotification = async (socket) => {
    try {
      const now = new Date();
      const currentDay = getCurrentDay();
      const routines = await Routine.find({
        days: {$in: currentDay},
        activateNotification: true,
        userEmail: {$ne: null}
      }).exec();
      const currentHours = DateTime.local().toFormat("T");
      for (const routine of routines) {
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const routineNotification = await RoutineNotification.findOne({
          routineId: routine._id,
          created: {$gte: startOfToday}
        }).exec();

        if (!routineNotification && currentHours === routine.startTime) {
          socket.emit(`routine-notification/${routine.userEmail}`, routine);
        }
      }
    } catch (error) {
      logger.error("Error ", error);
    }
  };
}

module.exports = createSocket;