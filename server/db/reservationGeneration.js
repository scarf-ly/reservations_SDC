// \copy reservations (restaurant_id, moment, reservation_size) FROM '/Users/keatontatooles/Documents/sdc/reservation/server/db/reservations.csv' DELIMITER ',' CSV;
const fs = require('fs');

// const arrayCsv = require("array-csv");

// const arrayWithoutHeader = [];

// while (arrayWithoutHeader.length < 20) {
//   const newEntry = [];
//   newEntry.push(Math.floor(Math.random()*10), Math.floor(Math.random()*100));
//   arrayWithoutHeader.push(newEntry);
// }


// arrayCsv.array2dToCsv(arrayWithoutHeader, "reservations.csv", {hasHeader: false});

const myWriteStream = fs.createWriteStream('reservations.csv');
// for (let i = 0; i < 5; i++) {
//     let data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
//     data += '\n';
//     myWriteStream.write(data, 'utf8');
// }
// myWriteStream.end();

let data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
function writeOneMillionTimes(myWriteStream, data, encoding, callback) {
    let i = 50000000;
    write();
    function write() {
      let ok = true;
      do {
        i--;
        data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
        data += '\n';
        if (i === 0) {
          // Last time!
          myWriteStream.write(data, encoding, callback);
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          ok = myWriteStream.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // Had to stop early!
        // Write some more once it drains.
        myWriteStream.once('drain', write);
      }
    }
}

writeOneMillionTimes(myWriteStream, data, 'utf8');
