require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const goal = require('./routes/goal');
const routine = require('./routes/routine');
const routineProgress = require('./routes/routineprogress');
const http = require("http");
const {getCurrentDay} = require("./utils/date-parser");
const Routine = require('./model/Routine');
const RoutineNotification = require('./model/RoutineNotification');
const {DateTime} = require('luxon');

mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('Connected to db!'))
    .catch(err => console.log(`Error occurred! ${err.message}`));

mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/goals', goal);
app.use('/routines', routine);
app.use('/routine/progress', routineProgress);

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT"]
    }
});

let interval;

io.on("connection", async (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(async () => await sendTodaysRoutineEvents(socket), 10000);
    socket.on("disconnect", async () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});


const sendTodaysRoutineEvents = async (socket) => {
    try {
        const now = new Date();
        const currentDay = getCurrentDay();
        const routines = await Routine.find({
            days: {$in: currentDay},
            activateNotification: true,
            userEmail: {$ne: null}
        }).exec();
        const currentHours = DateTime.local()
            .toFormat("T");
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
        console.error("Error ", error);
    }
};


server.listen(port, () => console.log(`Server listening to port ${port}!`));
