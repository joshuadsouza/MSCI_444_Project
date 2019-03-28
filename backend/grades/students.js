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

//Get Student Data from Database
exports.get_students = (conn) => {

    return new Promise((resolve, reject) => {
        conn.connect( function(err) {
            if(err){
                console.log('Error Occured in Connection');
                console.log(err);
                throw err;
            }
            var statement = "select studentID, first_name, last_name from Student;";
    
            conn.query(statement, async function(err, result, fields){
                if(err){
                    throw err;
                }
                resolve(result);    
            });
        });
    }) 
}

