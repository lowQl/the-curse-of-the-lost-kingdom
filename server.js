const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(1);
    res.send('Hello.');
});

app.listen(process.env.Port | 80);
