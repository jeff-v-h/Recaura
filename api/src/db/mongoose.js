if (process.env.NODE_ENV === 'test') {
  const path = require('path');
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}
const mongoose = require('mongoose');
const keys = require('../helpers/keys');

mongoose.connect(keys.DB_CONN_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true
});
