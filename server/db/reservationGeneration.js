// \copy echo FROM '/Users/keatontatooles/Documents/sdc/reservation/server/db/reservations.csv' DELIMITER ',' CSV;


const arrayCsv = require("array-csv");

const arrayWithoutHeader = [];

while (arrayWithoutHeader.length < 20) {
  const newEntry = [];
  newEntry.push(Math.floor(Math.random()*10), Math.floor(Math.random()*100));
  arrayWithoutHeader.push(newEntry);
}


arrayCsv.array2dToCsv(arrayWithoutHeader, "reservations.csv", {hasHeader: false});