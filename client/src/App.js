import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);

export default () => (
  <Router>
    <div id="root">
      <div></div>
      <hr></hr>

      <Switch>

        <Route exact path="/api/" component = {Courses} />
        <Route path="/api/courses/:id" component={CourseDetail} />
        <Route path="/api/signin" component={UserSignIn} />
        <Route path="/api/signup" component={UserSignUpWithContext} />
        <Route component={NotFound} />

      </Switch>
    </div>
  </Router>
);
