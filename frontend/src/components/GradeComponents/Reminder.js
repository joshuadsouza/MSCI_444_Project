import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Reminder extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseID: "MSCI436",
            type: "Assignment",
            description: "Description",
            due_date: "3/30/2019",
            reminderLoad: false,
            courseData: []
        }

        this.checkDates.bind(this);
    }

    componentDidMount(){
        console.log(this.state.courseData);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.showReminder !== prevProps.showReminder) {
            await this.setState({
                reminderLoad: this.props.showReminder
            });
        }
        if (this.props.grade_data !== prevProps.grade_data) {
            var reminder_data = await this.checkDates(this.props.grade_data);
            await this.setState({
                courseData: reminder_data
            });
        }
        if (this.props.courseID !== prevProps.courseID) {
            await this.setState({
                courseID: this.props.courseID
            });
        }
    }

    checkDates = async (data) => {
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var filtered = data.filter(function(value, index, arr){
            return value.due_date > date;
        });
        return filtered;
    }

    render(){
        return (
            <Grid container>
            { 
                this.state.reminderLoad &&
                this.state.courseData.map((item, i) => {
                    return(
                        <Grid item>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary">
                                    {this.state.courseID}
                                </Typography>
                                <Typography color="textSecondary">
                                    {item.type}
                                </Typography>
                                <Typography component="p">
                                    {item.description}
                                </Typography>
                                <Typography>
                                    {new Date(item.due_date).toISOString().slice(0, 11).replace('T', ' ')}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    );
                })

            }
            </Grid>
        );
    }
}

export default Reminder;