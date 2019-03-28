var express = require('express');
var router = express.Router();
var student_data = require('./students.js');
var course_data = require('./courses.js');
var grade_data = require('./student_grades.js');

router.get('/student_data', async function(req, res, next){
    //Connect to the Database
    var conn = await student_data.connection().catch((err) => {
        return next(err);
    });
    //Query the Database for the Students in the Student Table
    var data = await student_data.get_students(conn);
    conn.end();
    console.log(data);
    res.json(data);
})

router.post('/student_courses', async function(req, res, next){
    //Connect to the Database
    var conn = await student_data.connection().catch((err) => {
        return next(err);
    });
    //Query for the Student Courses
    var c_data = await course_data.get_courses(req, conn);
    res.json(c_data);
    console.log(c_data);
    conn.end();
})

router.post('/student_course_grades', async function(req, res, next){
    //Connect to the Database
    var conn = await student_data.connection().catch((err) => {
        return next(err);
    });
    //Query for the Student Grades for the Specific Course
    var g_data = await grade_data.get_courses(req, conn);
    res.json(g_data);
    console.log(g_data);
    conn.end();
})

//Export this module for server.js use
module.exports = router;