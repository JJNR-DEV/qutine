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
const {sendTodaysRoutineEvents} = require("./notifications/sendTodaysRoutineEvents");

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

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => sendTodaysRoutineEvents(socket), 10000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

server.listen(port, () => console.log(`Server listening to port ${port}!`));
