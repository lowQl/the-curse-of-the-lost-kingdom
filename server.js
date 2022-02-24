const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello.');
});

app.listen(process.env.Port | 3000, () => {
    console.log('Welcome to My Node js Server.');
});
