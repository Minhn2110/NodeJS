const express = require('express');
const fs = require('fs');
const morgan = require('morgan')
const app = express();
const port = 4000;

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // To call next funciton
});
app.use(morgan('dev'))

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    req: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  console.log('tour', tour);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  console.log('🚀 ~ app.post ~ req', req.body);
  res.send('POST request to the homepagee');
};

// app.get('/api/v1/tours', getTours);
app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);

app.route('/api/v1/tours').get(getTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
