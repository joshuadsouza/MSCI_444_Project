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
            var statement =
             "select Grades.* from Student_Course_Grade inner join Grades on Student_Course_Grade.gradeID = Grades.gradeID where Student_Course_Grade.studentID = "+String(req.body.student_ID)+" and Student_Course_Grade.courseID='"+String(req.body.course_ID)+"'";
    
            conn.query(statement, async function(err, result, fields){
                if(err){
                    throw err;
                }
                resolve(result);    
            });
        });
    }) 
}

