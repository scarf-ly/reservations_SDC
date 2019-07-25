// \copy reservations (restaurant_id, reservation_time, reservation_size) FROM '/Users/keatontatooles/Documents/sdc/reservation/reservations.csv' DELIMITER ',' CSV;
// \copy restaurants (restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, reservation_increment, available_seats) FROM '/Users/keatontatooles/Documents/sdc/reservation/restaurants.csv' DELIMITER ',' CSV;
// SELECT pg_size_pretty( pg_total_relation_size('restaurants') );
const fs = require('fs');
const moment = require('moment');
const faker = require('faker');
var count = 0;

const generateData = () => {
    count += 1;

    let restaurant_name = faker.name.lastName();
    let min_reservation_size = 1 + Math.floor(Math.random()*4);
    let max_reservation_size = 5 + Math.floor(Math.random()*6);
    let reservation_length = 60 + Math.floor(Math.random()*4)*15;
    let open_time = 5 + Math.floor(Math.random()*7);
    let close_time = 15 + Math.floor(Math.random()*8);
    let reservation_increment = [15, 30, 60][Math.floor(Math.random()*3)];
    let available_seats = 10 + Math.floor(Math.random()*60);
    const restaurantsArr = [];
    restaurantsArr.push(restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, reservation_increment, available_seats);
    let restaurants = restaurantsArr.join(',');
    restaurants += '\n';
    
    let reservation_count = 20 + Math.floor(Math.random()*50);
    let reservations = '';
    for (let i = 0; i < reservation_count; i++) {
      const reservationsArr = [];
      reservationsArr.push(count, Math.floor(Math.random()*10), Math.floor(Math.random()*10))
      let reservationEntry = reservationsArr.join(',');
      reservationEntry += '\n';
      reservations += reservationEntry;
    }


    return reservations;



    
}

const restaurantsWriteStream = fs.createWriteStream('restaurants.csv');
// const reservationWriteStream = fs.createWriteStream('reservations.csv');

let data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
function writeOneMillionTimes(restaurantsWriteStream, data, encoding, callback) {
    let i = 10;
    write();
    function write() {
      let ok = true;
      do {
        i--;
        // data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
        // data += '\n';
        data = generateData();
        if (i === 0) {
          // Last time!
          restaurantsWriteStream.write(data, encoding, callback);
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          ok = restaurantsWriteStream.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // Had to stop early!
        // Write some more once it drains.
        restaurantsWriteStream.once('drain', write);
      }
    }
}

writeOneMillionTimes(restaurantsWriteStream, data, 'utf8');
