if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const app = require('./app');
const keys = require('./helpers/keys');

const port = keys.PORT || 5000;

app.listen(port, () => {
  console.log('Server is up on port ', port);
});
