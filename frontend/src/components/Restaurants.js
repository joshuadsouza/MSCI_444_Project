import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

class Restaurants extends Component {
    //Class States
    constructor(props){
        super(props);
        this.state = {
            rest_types: [],
            rest_type: "Asian",
            restTypeLoad: false,
            restaurant_data: []
        }

        this.handleRestType.bind(this);
    }

    //Component Mount Function
    componentDidMount(){
        //Get the Students from the Database and Populate the State
        fetch("http://127.0.0.1:5000/restaurant/restaurant_types")
        .then(res => res.json())
        .then(
         (result) => {
           this.setState({
             rest_types: result
           });
           console.log(this.state.rest_types);
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

    //Handle Switch
    handleRestType = async (event) => {
        await this.setState({rest_type: event.target.value});
        console.log(this.state.rest_type);
    }

    //Post for Restaurant Type
    selectRestType = (event) => {
        fetch('http://127.0.0.1:5000/restaurant/restaurant_data', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rest_type: this.state.rest_type
        })
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    restaurant_data: result,
                    restTypeLoad: true
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

    render(){
        return (
            <Grid container direction="column"  justify="space-evenly" alignItems="center">
            <Grid item>
            <h1>Find a Restaurant</h1>
            </Grid>

            <Grid item>
                <select value={this.state.rest_type} onChange={this.handleRestType}>
                    {
                        this.state.rest_types.map(function(item, i){
                            return <option value={item.restaurant_type}>{item.restaurant_type}</option>
                        })
                    }
                </select>
                <button onClick={this.selectRestType}>Select Type</button>
            </Grid>

            {
                this.state.restTypeLoad &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Restaurant name</TableCell>
                            <TableCell>On Campus</TableCell>
                            <TableCell>Address/Location</TableCell>
                            <TableCell>Menu Link</TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.restaurant_data.map(function(item, i){
                                return (
                                    <TableRow>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.oncampus}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell><a href={item.menu} target="_blank">{item.menu}</a></TableCell>
                                    <TableCell>{item.phone_number}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            }

            </Grid>
        );
    }
}

export default Restaurants;