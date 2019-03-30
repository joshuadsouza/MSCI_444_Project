require('dotenv').config();
var exports = module.exports = {};

//Get Student Data from Database
exports.get_rest_data = (req, conn) => {

    return new Promise((resolve, reject) => {
        conn.connect( function(err) {
            if(err){
                console.log('Error Occured in Connection');
                console.log(err);
                throw err;
            }
            var statement = "select * from Restaurant where restaurant_type='"+String(req.body.rest_type)+"'";
            console.log(statement);
            conn.query(statement, async function(err, result, fields){
                if(err){
                    throw err;
                }
                resolve(result);    
            });
        });
    }) 
}

