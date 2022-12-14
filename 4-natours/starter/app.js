const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute.js');
const userRouter = require('./routes/userRoute.js');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Midleware

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // To call next funciton
});
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// Router

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
