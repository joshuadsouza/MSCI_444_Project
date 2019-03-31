import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class CurrentGrade extends Component {
    constructor(props){
        super(props);
        this.state = {
            grade: [],
            calculated_grade: 0,
            gradeLoad: false
        };

        this.calculateGrade.bind(this);
        this.addValues.bind(this);
    }

    componentDidMount(){
        console.log(this.state.grade);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.grade_data !== prevProps.grade_data) {
            await this.setState({
                grade: this.props.grade_data
            });
            this.calculateGrade();
        }
        if (this.props.showReminder !== prevProps.showReminder) {
            await this.setState({
                gradeLoad: this.props.showReminder
            });
        }
    }

    //Function to Calculate the Grade and Update the Component State
    async calculateGrade(){
        var grade_count = 0;
        var weight_count = 0;
        var grade_data = this.state.grade;
        for (var i=0; i<grade_data.length; i++){
            var obj = grade_data[i];
            var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var grade_date = new Date(obj.due_date).toISOString().slice(0, 19).replace('T', ' ');
            if (date>grade_date){
            weight_count = await this.addValues(obj.weight, weight_count);
            grade_count = await this.addGradeWeight(obj.grade, obj.weight, grade_count);
            }
        }
        var cal_grade = grade_count/weight_count*100
        cal_grade = cal_grade.toFixed(2);
        await this.setState({
            calculated_grade: cal_grade
        });
        console.log(this.state.calculated_grade);
    }

    //Get the Grade Weighting
    addGradeWeight = async (grade, weight, grade_count) => {
        return new Promise(async function(resolve){
            var grade_weight = (grade/100)*weight;
            grade_count = grade_weight + grade_count;
            resolve(grade_count);
        })
    }

    //Add Two Values
    addValues = (item_1, item_2) => {
        return new Promise(function(resolve){
            var count_return = item_1 + item_2;
            resolve(count_return);
        });
    }

    render() {
        return(
            <Grid container>
            { this.state.gradeLoad &&
            <Grid item>
            <Typography variant="h5" color="secondary">
            Current grade in the course is {this.state.calculated_grade} %
            </Typography>
            </Grid>
            }
            </Grid>
        );
    }
}

export default CurrentGrade;