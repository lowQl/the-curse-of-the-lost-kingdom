const express = require('express');
const path = require('path');
const { dirname } = require('path');
const db = require(path.join(dirname(require.main.filename), 'connect'));
const router = express.Router();

router.get('/login', (req, res) => {
  db.query('SELECT * FROM team').then(([rows, fields]) => {
    return res.json(rows);
  });
});

module.exports = router;
