import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import CurrentGrade from './GradeComponents/CurrentGrade';
import Reminder from './GradeComponents/Reminder';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

const styles = () => ({
    titlePadding: {
      paddingBottom: '1rem',
    },
    containerPadding: {
      padding: '5rem'
    },
    cardMargin: {
      margin: '0.5rem',
      maxWidth: 300
    },
    selectStyle: {
        minWidth: 150,
        margin: '0.5rem'
    },
    buttonStyle: {
        margin: '0.5rem'
    },
    textPadding: {
        padding: '2.5rem'
    }
  });

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

        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.containerPadding}>
            <Grid item className={classes.titlePadding}>
                <Typography variant="h2">
                    Course Information
                </Typography>
            </Grid>
            
            <Grid item container direction="row" justify="center" alignItems="flex-start">
            <Grid item>
            <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-simple">
                Student Name
            </InputLabel>
                <Select
                    value={this.state.studentID}
                    onChange={this.handleSelectChange}
                    className={classes.selectStyle}
                    input={
                    <OutlinedInput
                        labelWidth="100"
                        name="Student Name"
                        id="outlined-age-simple"
                    />
                    }
                >   
                    {
                        this.state.student.map(function(item, i){
                            return <MenuItem value={item.studentID}>{item.first_name} {item.last_name}</MenuItem>;
                        })
                    }
                </Select>
            </FormControl>

            <Button variant="contained" color="secondary" onClick={this.selectStudentCourse} className={classes.buttonStyle}>Select Student</Button>
            
            </Grid>
            </Grid>
            {
            this.state.courseLoad &&
            <Grid item>
            <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-course-simple">
                Course
            </InputLabel>
                <Select
                    value={this.state.courseID}
                    onChange={this.handleCourseSelect}
                    className={classes.selectStyle}
                    input={
                    <OutlinedInput
                        labelWidth="100"
                        name="Course"
                        id="outlined-course-simple"
                    />
                    }
                >   
                    {
                        this.state.courses.map(function(item, i){
                            return <MenuItem value={item.courseID}>{item.courseID}</MenuItem>;
                        })
                    }
                </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={this.selectCourse} className={classes.buttonStyle}>Select Course</Button>
            </Grid>
            }


            {/*BELOW IS THE COMPONENT FOR THE COURSE REMINDERS */}
            <Grid item container>
            {
                this.state.gradeLoad &&
                <Grid item>
                <Typography variant="h5" className={classes.textPadding} color="secondary">
                    Course Reminders
                </Typography>
                </Grid>
            }
            <Grid item>
                <Reminder showReminder={this.state.gradeLoad} grade_data={this.state.grades} courseData={this.state.courseID}/>
            </Grid>
            </Grid>

             {/*BELOW IS THE COMPONENT FOR THE CURRENT GRADE IN THE COURSE */}
        
             <Grid item container direction="row" className={classes.textPadding}>
             <Grid>
            <CurrentGrade showReminder={this.state.gradeLoad} grade_data={this.state.grades}></CurrentGrade>
            </Grid>
            </Grid>

            {
                this.state.gradeLoad &&
                <Table>
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
            </Grid>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Grades);