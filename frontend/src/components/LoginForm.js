import React, { Component } from 'react';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


class LoginForm extends Component {
    state = {
        username: "",
        password: "",
    }

    handleNameChange = event => {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <Grid container direction="column" justify="space-between" alignItems="center" spacing={40}>
            {/*Heading Section*/}
            <Grid item>
                <Typography variant="h1">STUDI</Typography>
            </Grid>

            <Grid item>
            <Grid container>
             {/*Form Section*/}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Login</FormLabel>
                    <FormGroup>
                        {/*Username*/}
        
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-simple">Username</InputLabel>
                            <Input id="component-simple" value={this.state.username} onChange={this.handleNameChange}></Input>
                        </FormControl>
                       

                        {/*Password*/}
                        
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-simple">Password</InputLabel>
                            <Input id="component-simple" value={this.state.password} onChange={this.handlePasswordChange}></Input>
                        </FormControl>
                        
                        
                    </FormGroup>
                </FormControl>
                </Grid>
            </Grid>
            </Grid>
        );
    }
}

export default LoginForm;