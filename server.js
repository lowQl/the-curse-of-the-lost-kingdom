const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.use('/css', express.static('views/public/css'));

app.get('/', (req, res) => {
    const options = {
        root: __dirname + '/views/',
    };
    res.sendFile('login.html', options);
});

app.listen(port, () => {
    console.log(`[Message]: Server is listening on port ${port}`);
});
