// \copy reservations (restaurant_id, reservation_time, reservation_size) FROM '/Users/keatontatooles/Documents/sdc/reservation/reservations.csv' DELIMITER ',' CSV;
// \copy restaurants (restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, reservation_increment, available_seats) FROM '/Users/keatontatooles/Documents/sdc/reservation/restaurants.csv' DELIMITER ',' CSV;
// SELECT pg_size_pretty( pg_total_relation_size('restaurants') );
// unix minute = 60
// unix hour = 3600
// unix day = 86,400
const fs = require('fs');
const faker = require('faker');
var count = 0;
var originalTime = 1564642800; // August 1st 2019 at 12 AM Pacific in Unix Time
var startTime = 1564707600 // August 1st 2019 at 6 PM Pacific in Unix Time
function randomRange(min, max) { // random number between min (inclusive) and max (exclusive);
  return Math.floor(Math.random() * (max - min)) + min;
}
var reservation_id = 1564455003;

const generateData = () => {
    count += 1;

    let restaurant_name = faker.name.lastName();
    let min_reservation_size = 1 + Math.floor(Math.random()*4);
    let max_reservation_size = 5 + Math.floor(Math.random()*6);
    let reservation_length = 60 + Math.floor(Math.random()*4)*15;
    let open_time = 9 + Math.floor(Math.random()*6);
    let close_time = 15 + Math.floor(Math.random()*8);
    let available_seats = 10 + Math.floor(Math.random()*30);
    const restaurantsArr = [];
    restaurantsArr.push(count, restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, available_seats, 0, 0, 0);
    let restaurants = restaurantsArr.join(',');
    restaurants += '\n';
    
    const likelihood1 = Math.random();
    let reservation_count;
    if (likelihood1 > 0.9) {
      reservation_count = 90 + Math.floor(Math.random()*20);
    } else if (likelihood1 > 0.5) {
       reservation_count = 20 + Math.floor(Math.random()*20);
    } else {
       reservation_count = 1 + Math.floor(Math.random()*3);
    }

    // let reservation_count = 20 + Math.floor(Math.random()*50);
    let reservations = '';
    for (let i = 0; i < reservation_count; i++) {
      const reservationsArr = []; 
      const likelihood = Math.random();
      if (likelihood > 0.3) {
        timestamp = startTime + (Math.floor(Math.random()*3) * 3600) + (Math.floor(Math.random()*4) * 86400)
      } else {
        let timeframe = close_time - open_time;
        timestamp = originalTime + (open_time * 3600) + (Math.floor(Math.random()*timeframe)*3600);
      }
      const reservation_size = randomRange(min_reservation_size, max_reservation_size + 1);
      reservationsArr.push(count, Math.floor(Math.random()*50000000), timestamp, reservation_size);
      let reservationEntry = reservationsArr.join(',');
      reservationEntry += '\n';
      reservations += reservationEntry;
    }
    return [restaurants, reservations];    
}


const restaurantsWriteStream = fs.createWriteStream('restaurantsCA.csv');
const reservationsWriteStream = fs.createWriteStream('reservationsCA.csv');

let data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
function writeOneMillionTimes(restaurantsWriteStream, reservationsWriteStream, data, encoding, callback) {
    let i = 10000000;
    write();
    function write() {
      let ok = true;
      do {
        i--;
        data = generateData()
        restaurantData = data[0];
        reservationData = data[1];
        if (i === 0) {
          // Last time!
          restaurantsWriteStream.write(restaurantData, encoding, callback);
          reservationsWriteStream.write(reservationData, encoding, callback);
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          restaurantsWriteStream.write(restaurantData, encoding);
          ok = reservationsWriteStream.write(reservationData, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // Had to stop early!
        // Write some more once it drains.
        reservationsWriteStream.once('drain', write);
      }
    }
}

writeOneMillionTimes(restaurantsWriteStream, reservationsWriteStream, data, 'utf8');


// 444988166 reservations in the reservation table 

