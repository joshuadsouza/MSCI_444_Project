import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class Grades extends Component {
    render() {
        return (
            <Grid>
                <h1>Grades Section</h1>
                <Link to="/">Back</Link>
            </Grid>
        );
    }
}

export default Grades;