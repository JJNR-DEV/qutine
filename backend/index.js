require('dotenv').config();
require('./config/database');
const path = require('path');
const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const goal = require('./routes/goal');
const routine = require('./routes/routine');
const routineProgress = require('./routes/routineprogress');
const http = require("http");
const jwt = require('express-jwt');
const port = process.env.PORT || 4000;
const createSocket = require('./config/socket');
const logger = require('./config/logger');

// middleware
const buildPath = path.join(__dirname, '../frontend', 'build');
app.use(express.static(buildPath));
app.use(express.json());
app.use(jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
  getToken: function parseToken(req) {
    if (req.headers.authorization) {
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

// routes
app.use('/api/user', authRoute);
app.use('/goals', goal);
app.use('/routines', routine);
app.use('/routine/progress', routineProgress);
if (process.env.QUTINE_ENV === 'PRODUCTION') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
  });
}

const server = http.createServer(app);

createSocket(app, server);

server.listen(port, () => logger.info(`Server listening to port ${port}!`));