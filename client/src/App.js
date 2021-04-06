import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
// import CreateCourse from './components/CreateCourse';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div id="root">
      <div></div>
      <hr></hr>

      <HeaderWithContext />
      <Switch>

        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        {/* <Route path="/courses/:id/update" component={UpdateCourse} /> */}
        {/* <Route path="/courses/create" component={CreateCourse} /> */}
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route component={NotFound} />

      </Switch>
    </div>
  </Router>
);
