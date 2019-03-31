import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

class NavBar extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Link component={RouterLink} to="/">
                        <Button>
                            Home
                        </Button>
                        </Link>
                        <Link component={RouterLink} to="/grades">
                        <Button>
                            Course Information
                        </Button>
                        </Link>
                        <Link component={RouterLink} to="/restaurants">
                        <Button>
                            Restaurant
                        </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        );
    }
}

export default NavBar;