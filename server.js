const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello.');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`[Message]: Server is listening on port ${port}`);
});
