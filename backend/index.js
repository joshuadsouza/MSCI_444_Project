const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello Brandon!');
})

app.get('/josh', (req, res) => {
    res.send('Hello Josh!');
})


app.listen(port, () => {
    console.log('Listening on Port: '+port);
})