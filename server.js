const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('Hello.');
});

app.listen(port, () => {
    console.log(`[Message]: Server is listening on port ${port}`);
});
