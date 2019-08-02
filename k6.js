import http from "k6/http";
import { sleep } from "k6";

export default function() {
  let restaurant;
  const chance = Math.random()
  if (chance < .95) {
      restaurant = 1 + Math.floor(Math.random()*100)
  } else {
      restaurant = 1 + Math.floor(Math.random()*10000000);
  }
  const time = 1564714800
//   http.get(`http://localhost:3001/1000`);
  http.get(`http://localhost:3001/${restaurant}/restaurantCapacity`);
//   http.get(`http://localhost:3001/${restaurant}/reservation?timestamp=${time}`);
};