require('dotenv').config();
var exports = module.exports = {};

//Get Student Data from Database
exports.get_courses = (req, conn) => {

    return new Promise((resolve, reject) => {
        conn.connect( function(err) {
            if(err){
                console.log('Error Occured in Connection');
                console.log(err);
                throw err;
            }
            console.log(req.body.student_ID);
            var statement = "select distinct(courseID) from Student_Course_Grade where studentID="+String(req.body.student_ID);
    
            conn.query(statement, async function(err, result, fields){
                if(err){
                    throw err;
                }
                resolve(result);    
            });
        });
    }) 
}

