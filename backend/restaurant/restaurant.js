var express = require('express');
var router = express.Router();
var mysql_connection = require('./connection.js');
var rest_types = require('./types.js');
var rest_data = require('./restaurant_data');

router.get('/restaurant_types', async function(req, res, next){
    //Connect to the Database
    var conn = await mysql_connection.connection().catch((err) => {
        return next(err);
    });
    //Query the Database for the Students in the Student Table
    var data = await rest_types.get_courses(conn);
    conn.end();
    console.log(data);
    res.json(data);
})

router.post('/restaurant_data', async function(req, res, next){
    //Connect to the Database
    var conn = await mysql_connection.connection().catch((err) => {
        return next(err);
    });

    //Query the Database for the Restaurant Data
    var data = await rest_data.get_rest_data(req, conn);
    conn.end();
    console.log(data);
    res.json(data);
})

//Export this module for server.js use
module.exports = router;