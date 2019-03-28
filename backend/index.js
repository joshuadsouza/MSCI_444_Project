const express = require('express');
const app = express();
const port = 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

app.get('/josh', (req, res) => {
    res.send('Hello Josh!');
})


app.listen(port, () => {
    console.log('Listening on Port: '+port);
})

var grade_router = require("./grades/grade.js");
app.use('/grades', grade_router);