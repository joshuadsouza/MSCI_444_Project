import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Grades from './Grades';
import CourseReminders from './CourseReminders';

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/grades" component={ Grades } />
            <Route path="/course-reminders" component = { CourseReminders } />
        </Switch>
    </main>
)

export default Main;