// \copy restaurants (restaurant_name, available_seats) FROM '/Users/keatontatooles/Documents/sdc/reservation/restaurantsTest.csv' DELIMITER ',' CSV;
// node --max-old-space-size=7168 restaurantGeneration.js

const arrayCsv = require("array-csv");
const faker = require('faker')

console.log(faker.name.lastName());

const arrayWithoutHeader = [];

while (arrayWithoutHeader.length < 10000000) {
  const newEntry = [];
  newEntry.push(faker.name.lastName(), 10 + Math.floor(Math.random()*50));
  arrayWithoutHeader.push(newEntry);
}


arrayCsv.array2dToCsv(arrayWithoutHeader, "restaurants.csv", {hasHeader: false});