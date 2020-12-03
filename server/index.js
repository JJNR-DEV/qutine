require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
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
const jwt = require('express-jwt');
const port = process.env.PORT || 4000;
const socketIO = require('socket.io');
const INDEX = '/index.html';

mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('Connected to db!'))
    .catch(err => console.log(`Error occurred! ${err.message}`));

mongoose.set('useFindAndModify', false);
mongoose.set('debug', process.env.ENABLE_MONGOOSE_DEBUG);

const buildPath = path.join(__dirname, '../client', 'build');
app.use(express.static(buildPath));

app.use(express.json());

app.use(jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
        if (!req.headers.authorization || req.headers.authorization === 'undefined') {
            return null;
        }
        if (req.headers.authorization) {
            return req.headers.authorization;
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}));

app.use('/api/user', authRoute);
app.use('/goals', goal);
app.use('/routines', routine);
app.use('/routine/progress', routineProgress);
if (process.env.QUTINE_ENV === 'PRODUCTION') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
    });
}

const server = http.createServer(app);

let io;
if (process.env.QUTINE_ENV === 'PRODUCTION') {
    console.log('Starting socket.io for production...');
    app.use((req, res) => res.sendFile(INDEX,
        {root: path.join(__dirname + '/../client/build/')}));
    io = socketIO(server);
} else {
    console.log('Starting socket.io for development...');
    io = socketIO(server, {
        cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST", "PUT"]
        }
    });
}

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
        console.log('starting...');
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

            console.log('currentHours: ' + currentHours
                + " routineStartTime: " + routine.startTime
                + " user: " + routine.userEmail
            );
            if (!routineNotification && currentHours === routine.startTime) {
                socket.emit(`routine-notification/${routine.userEmail}`, routine);
            }
        }
    } catch (error) {
        console.error("Error ", error);
    }
};

server.listen(port, () => console.log(`Server listening to port ${port}!`));
