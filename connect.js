const mysqli = require('mysql2');

const db = mysqli.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'tcotlk',
});

module.exports = db;
