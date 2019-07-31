const { Client } = require('pg')
const client = new Client({
    database: 'mydb'
})
client.connect()


const query = {
    text: 'SELECT * FROM restaurants where id = ($1)',
    values: ['5'],
  }
  // callback
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
})