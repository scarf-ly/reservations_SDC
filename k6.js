import http from "k6/http";

export default function() {
  let restaurant;
  const chance = Math.random()
  if (chance < .95) {
      restaurant = 1 + Math.floor(Math.random()*1000) 
  } else {
      restaurant = 1 + Math.floor(Math.random()*10000000);
  }
  const time = [1564714800, 1564966800, 1564700400][Math.floor(Math.random()*3)]
  http.get(`http://localhost:3005/1000`);
  http.get(`http://localhost:3005/${restaurant}/restaurantCapacity`);
  http.get(`http://localhost:3005/${restaurant}/reservation?timestamp=${time}`);
  if (chance > .985) {
      let user_id = Math.floor(Math.random()*500000)
      let reservation_size = 1 + Math.floor(Math.random()*8)
      http.post(`http://localhost:3005/${restaurant}/reservation?timestamp=${time}&user_id=${user_id}&reservation_size=${reservation_size}`)
  }
};