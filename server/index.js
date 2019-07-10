const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const db = require('./db/index');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/reservation', (req, res) => {
  const { restaurant_id, startTimestamp, endTimestamp } = req.query; // get query parameters
  const sqlQuery = `SELECT * FROM reservation WHERE restaurant_id = ${restaurant_id} AND timestamp BETWEEN ${startTimestamp} AND ${endTimestamp}`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
