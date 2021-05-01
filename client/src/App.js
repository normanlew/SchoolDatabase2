import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => {
  return (
    <Router>
      <div id="root">
        <div></div>
        <hr></hr>

        <HeaderWithContext />
        <Switch>

          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route component={NotFound} />

        </Switch>
      </div>
    </Router>
  );
};
export default App;
