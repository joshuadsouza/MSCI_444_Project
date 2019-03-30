require('dotenv').config();
var mysql = require('mysql');
var exports = module.exports = {};

//Establish Connection
exports.connection = () => {
    return new Promise(resolve => {
        var conn = mysql.createConnection({
            host : process.env.RDS_HOSTNAME,
            user : process.env.RDS_USERNAME,
            password : process.env.RDS_PASSWORD,
            database : process.env.RDS_DB_NAME,
            port : process.env.RDS_PORT
        });
        console.log('Connected');
        resolve(conn);
    })
}

