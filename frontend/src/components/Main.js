import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Grades from './Grades';
import Restaurants from './Restaurants';

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/grades" component={ Grades } />
            <Route path="/restaurants" component = { Restaurants } />
        </Switch>
    </main>
)

export default Main;