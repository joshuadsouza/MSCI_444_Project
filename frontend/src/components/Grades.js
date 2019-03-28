import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

class Grades extends Component {
    //States for the Component - Include Student Name, Grades, Weight, and Due_Date
   constructor(props) {
       super(props);
       this.state = {
           student: [],
           studentID: 1,
           courses: [],
           courseID: "MSCI436",
           courseLoad: false,
           grades: [],
           gradeLoad: false
       };

       this.handleSelectChange.bind(this);
       this.selectStudentCourse.bind(this);
       this.selectCourse.bind(this);
   }

      //Get Data for Student ID
      componentDidMount(){
        //Get the Students from the Database and Populate the State
        fetch("http://127.0.0.1:5000/grades/student_data")
        .then(res => res.json())
        .then(
         (result) => {
           this.setState({
             student: result
           });
         },
         // Note: it's important to handle errors here
         // instead of a catch() block so that we don't swallow
         // exceptions from actual bugs in components.
         (error) => {
           this.setState({
             error
           });
         }
       );
    }

    //Function handles a change in the student name on the list
   handleSelectChange = async (event) => {
    await this.setState({studentID: event.target.value});
    fetch('http://127.0.0.1:5000/grades/student_courses', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_ID: this.state.studentID
                })
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            courses: result,
                            courseLoad: true,
                            gradeLoad: false
                        });
                    },
                    (error) => {
                        this.setState({
                            courseLoad: true,
                            error
                        });
                    }
                )
   }

   //Select a Course that the Student Has
   selectStudentCourse = (event) => {
        fetch('http://127.0.0.1:5000/grades/student_courses', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_ID: this.state.studentID
                })
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            courses: result,
                            courseLoad: true
                        });
                    },
                    (error) => {
                        this.setState({
                            courseLoad: true,
                            error
                        });
                    }
                )

    event.preventDefault();
   }


   //Handle Course Change
   handleCourseSelect = (event) => {
    this.setState({courseID: event.target.value});
   }
   //Get Grades for Student Given studentID and courseID
   selectCourse = (event) => {
    fetch('http://127.0.0.1:5000/grades/student_course_grades', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student_ID: this.state.studentID,
            course_ID: this.state.courseID
        })
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    grades: result,
                    gradeLoad: true
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
    event.preventDefault();
   }


   //Render Function for UI
    render() {
        return (
            <Grid container direction="column" justify="space-evenly" alignItems="center">
            <Grid item>
                <h1>Grades Section</h1>
            </Grid>

            <Grid item>
           
                <select value={this.state.studentID} onChange={this.handleSelectChange}>
                    {
                        this.state.student.map(function(item, i){
                            return <option value={item.studentID}>{item.first_name} {item.last_name}</option>;
                        })
                    }
                </select>
            
        
                {
                    !this.state.courseLoad &&
                    <button onClick={this.selectStudentCourse}>Select Student</button>
                }
            
            </Grid>
            {
            this.state.courseLoad &&
            <Grid item>
                <form>
                <select value={this.state.courseID} onChange={this.handleCourseSelect}>
                    {
                        this.state.courses.map(function(item, i){
                            return <option value={item.courseID}>{item.courseID}</option>
                        })
                    }
                </select>
                <button onClick={this.selectCourse}>Select Course</button>
                </form>
            </Grid>
            }
            {
                this.state.gradeLoad &&
                <Table striped bordered hover>
                    <TableHead>
                        <TableRow>
                            <TableCell>Grade Type</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.grades.map(function(item, i){
                                return (
                                    <TableRow>
                                    <TableCell>{item.grade_type}</TableCell>
                                    <TableCell>{item.grade}</TableCell>
                                    <TableCell>{item.weight}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            }
            <Grid item>
            <Link to="/">Back</Link>
            </Grid>
            </Grid>
        );
    }
}

export default Grades;