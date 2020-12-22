const mongoose = require('mongoose');
const logger = require('./logger');

// mongoose
mongoose.connect(process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}).then(() => logger.info('Connected to db!'))
  .catch(err => logger.error(`Error occurred! ${err.message}`));

mongoose.set('debug', process.env.ENABLE_MONGOOSE_DEBUG);

module.exports = mongoose;