const mongoose = require('mongoose');
const logger = require('./logger');

// mongoose
mongoose.connect(process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  debug: process.env.ENABLE_MONGOOSE_DEBUG
}).then(() => logger.info('Connected to db!'))
  .catch(err => logger.error(`Error occurred! ${err.message}`));

module.exports = mongoose;