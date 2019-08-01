const express = require('express');
const path = require('path');

const app = express();
const port = 3001;
const db = require('./db/index');
const client = require('./db/postgresDriver.js');

app.use('/:restaurantId' ,express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/:restaurantId/reservation/', (req, res) => {
  const { timestamp } = req.query; // get query parameters
  const { restaurantId } = req.params;
  const sqlQuery = {
    text: 'SELECT * FROM reservations where restaurant_id = ($1) and reservation_time = ($2)',
    values: [restaurantId, timestamp],
}
  client.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results.rows);
    }
  });
});

app.get('/:restaurantId/restaurantCapacity', (req, res) => {
  const { restaurantId } = req.params;
  const restaurantQuery = {
    text: 'SELECT available_seats FROM restaurants where id = ($1)',
    values: [restaurantId],
  }
  client.query(restaurantQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
