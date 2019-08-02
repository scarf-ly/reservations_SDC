import http from "k6/http";
import { sleep } from "k6";

export default function() {
  const restaurant = 1 + Math.floor(Math.random()*1000)
  const time = 1564714800
//   http.get(`http://localhost:3001/1000`);
  http.get(`http://localhost:3001/${restaurant}/restaurantCapacity`);
  http.get(`http://localhost:3001/${restaurant}/reservation?timestamp=${time}`);
};