import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

const styles = () => ({
  titlePadding: {
    padding: '2rem',
  },
  containerPadding: {
    padding: '5rem'
  },
  cardMargin: {
    margin: '0.5rem',
    maxWidth: 300
  }
});

class Home extends Component {
  render(){
    const { classes } = this.props;

    return(
      <MuiThemeProvider theme={theme}>
      <Grid container direction="col" justify="center" className={classes.containerPadding}>
        <Grid item className={classes.titlePadding}>
          <Typography variant="h2">
            Welcome to Studi!
          </Typography>
        </Grid>
        <Grid item container direction="row" justify="center">
        <Grid item>
        <Card className={classes.cardMargin}>
            <CardContent>
                <Typography color="primary">
                  Grade Calculator
                </Typography>
                <Typography component="p">
                  Students input graded items and their weightings to estimate their grades ahead of official grade release
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        <Grid item className={classes.cardMargin}>
        <Card>
            <CardContent>
                <Typography color="primary">
                  Local Food Suggestions
                </Typography>
                <Typography>
                Users provide the system with their location, and the system outputs nearby restaurants on and near campus
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        <Grid item className={classes.cardMargin}>
        <Card>
            <CardContent>
                <Typography color="primary">
                Reminders
                </Typography>
                <Typography>
                Users provide the system with their course calendar, and the system reminds students ahead of an upcoming deadline
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        </Grid>
      </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);