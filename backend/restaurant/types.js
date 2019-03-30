require('dotenv').config();
var exports = module.exports = {};

//Get Student Data from Database
exports.get_courses = (conn) => {

    return new Promise((resolve, reject) => {
        conn.connect( function(err) {
            if(err){
                console.log('Error Occured in Connection');
                console.log(err);
                throw err;
            }
            var statement = "select distinct(restaurant_type) from Restaurant;";
            conn.query(statement, async function(err, result, fields){
                if(err){
                    throw err;
                }
                resolve(result);    
            });
        });
    }) 
}

