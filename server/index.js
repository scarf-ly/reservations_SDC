require('newrelic');
const express = require('express');
const path = require('path');
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const redisClient = redis.createClient(REDIS_PORT);

const app = express();
const port = 3001;
const db = require('./db/index');
const { Client } = require('pg')
const client = new Client({
    database: 'mydb'
})
client.connect()

app.use('/:restaurantId' ,express.static(path.resolve(__dirname, '..', 'client', 'dist')));

const restaurantCache = (req, res, next) => {
  const { restaurantId } = req.params;
  redisClient.get(restaurantId.toString(), (err, data) => {
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

const reservationCache = (req, res, next) => {
  const { timestamp } = req.query; // get query parameters
  const { restaurantId } = req.params;
  redisClient.get(restaurantId.toString() + timestamp.toString(), (err, data) => {
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

// write middleware after this function to go to the cache before you do the database query
// this middleware is just the next argument after the endpoint, and its a function
// the middleware function itself takes request and response, searches the cache for the thing, then does next() if it doesn't return anything
// when you do the database query make sure to add the result of the specific call to the cache 
// 
app.get('/:restaurantId/reservation/', reservationCache, (req, res) => {
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
      redisClient.set(restaurantId.toString() + timestamp.toString(), JSON.stringify(results.rows));
      res.status(200).send(results.rows);
    }
  });
});

app.get('/:restaurantId/restaurantCapacity', restaurantCache, (req, res) => {
  const { restaurantId } = req.params;
  const restaurantQuery = {
    text: 'SELECT available_seats FROM restaurants where id = ($1)',
    values: [restaurantId],
  }
  client.query(restaurantQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      redisClient.set(restaurantId.toString(), JSON.stringify(results.rows));
      res.status(200).send(results.rows);
    }
  });
});

app.post('/:restaurantId/reservation', (req, res) => {
  const { timestamp, user_id, reservation_size } = req.query; // get query parameters
  const { restaurantId } = req.params;
  const sqlQuery = {
    text: 'INSERT INTO reservations (restaurant_id, user_id, reservation_time, reservation_size) VALUES ($1, $2, $3, $4)',
    values: [restaurantId, user_id, timestamp, reservation_size],
  };

  client.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send();
    }
  });
});

app.patch('/:restaurantId/reservation', (req, res) => {
  const { timestamp, user_id, reservation_size, newTime, newSize } = req.query
  const { restaurantID } = req.params
  const sqlQuery = {
    text: 'UPDATE reservations set reservation_time = $1, reservation_size = $2 where restaurant_id = $3 and $user_id = $4 and $reservation_size = $5 and reservation_time = $6',
    values: [newTime, newSize, restaurantID, user_id, reservation_size, timestamp],
  };

  client.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send()
    }
  });
});

app.delete('/:restaurantId/reservation', (req, res) => {
  const { timestamp, user_id, reservation_size } = req.query
  const { restaurantID } = req.params
  const sqlQuery = {
    text: 'DELETE FROM reservations where restaurant_id = $1 and $user_id = $2 and $reservation_size = $3 and reservation_time = $4',
    values: [restaurantID, user_id, reservation_size, timestamp]
  };

  client.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send();
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

