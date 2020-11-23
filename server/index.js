require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const createGoal = require('./routes/createGoal');
const createRoutine = require('./routes/createRoutine');

mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to db!'))
  .catch(err => console.log(`Error occurred! ${err.message}`));

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/new-goal', createGoal);
app.use('/new-routine', createRoutine);

app.listen(port, () => console.log(`Server listening to port ${port}!`));

