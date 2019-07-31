const cassandra = require('cassandra-driver');
const fs = require('fs');
const client = new cassandra.Client({ 
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1', 
    keyspace: 'yelp',
    port: '9042'
 });
 
// const query = 'SELECT name, email FROM users WHERE key = ?';
// const query = 'select * from reservations_by_restaurant where restaurant_id = 5000001 and reservation_time >= 1564966800 allow filtering';
// let start = new Date().getTime()
// console.log(start);
// client.execute(query)
//   .then((result) => {
//       let end = new Date().getTime();
//       console.log(end - start);
//       console.log(result.rows)
//   })
//   .catch(err => console.log(err));

const myStream = fs.createWriteStream('cassandraSpeedResultRestaurants.csv');
var start;
var end;
var query;

// for (let i = 4000000; i < 4001001; i++) {
//   query = `select * from reservations_by_restaurant where restaurant_id = ${i} and reservation_time >= 1564966800 allow filtering`;
//   start = new Date().getTime();
//   client.execute(query)
//   .then((result) => {
//       end = new Date().getTime();
//       myStream.write((end - start).toString() + '\n');
//   })
//   .catch(err => console.log(err));
// }


for (let i = 4000000; i < 4001001; i++) {
    query = `select * from restaurants where restaurant_id = ${i}`;
    start = new Date().getTime();
    client.execute(query)
    .then((result) => {
        end = new Date().getTime();
        myStream.write((end - start).toString() + '\n');
    })
    .catch(err => console.log(err));
  }