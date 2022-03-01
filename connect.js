const mysqli = require('mysql2');

const db = mysqli.createConnection({
  host: '140.125.207.21',
  user: 'root',
  password: '1234',
  database: 'tcotlk',
});

module.exports = db;
