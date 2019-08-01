const fs = require('fs');
const { Client } = require('pg')
const client = new Client({
    database: 'mydb'
})
client.connect()
var query;

// query = {
//     text: 'SELECT * FROM restaurants where id = ($1)',
//     values: ['100'],
//   }
//   // callback
//   client.query(query, (err, res) => {
//     if (err) {
//       console.log(err.stack)
//     } else {
//       console.log(res.rows)
//     }
// })

// for (let i = 4000000; i < 4001001; i++) {
//     query = {
//         text: 'SELECT * FROM restaurants where id = ($1)',
//         values: ['10'],
//     }
// }

const myWriteStream = fs.createWriteStream('postgresSpeedReservations.csv');



// for (let i = 5000000; i < 5001001; i++) {
//     query = {
//         text: 'SELECT * FROM restaurants where id = ($1)',
//         values: [i.toString()],
//     }
//     start = new Date().getTime();
//     client.query(query, (err, res) => {
//         end = new Date().getTime();
//         myWriteStream.write((end - start).toString() + '\n');
        
//     });
// }




for (let i = 6000000; i < 6001001; i++) {
    query = {
        text: 'SELECT * FROM reservations where restaurant_id = ($1) and reservation_time >=($2)',
        values: [i.toString(), '1564966800'],
    }
    let start = new Date().getTime();
    client.query(query, (err, res) => {
        let end = new Date().getTime();
        myWriteStream.write((end - start).toString() + '\n');
    });
}

module.exports = client;