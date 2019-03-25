import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <Grid>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/grades">Grades</Link></li>
                            <li><Link to="/course-reminders">Course Reminders</Link></li>
                            <li><Link to="/bus-schedule">Bus Schedule</Link></li>
                            <li><Link to="/restaurants">Restaurants</Link></li>
                        </ul>
                    </nav>
                </header>
            </Grid>
        );
    }
}

export default NavBar;