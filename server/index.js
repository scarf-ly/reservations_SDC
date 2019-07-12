const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const db = require('./db/index');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/reservation', (req, res) => {
  const { restaurantId, timestamp, partyNum } = req.query; // get query parameters
  const sqlQuery = `
    SELECT
      *
    FROM
      reservation
    WHERE
      restaurant_id = ${restaurantId}
      AND timestamp = ${timestamp}
      AND num_of_seat > ${partyNum}
  `;
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
