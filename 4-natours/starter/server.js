const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
console.log('process', process.env.NODE_ENV)


const port = 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
