import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
  state = {
    course: {},
    user: {},
  }

    componentDidMount() {
        fetch('http://localhost:5000/api/courses/' + this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
            this.setState ({ 
                course: data,
                user: data.User,
            });
            
        });
    }

  render() {
    const {
      course,
      user
    } = this.state;

    console.log("course is " + course);

    return (
      <div id="root">
        <div>
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
            </div>
          </div>
          <hr></hr>
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                    className="button button-secondary" href="index.html">Return to List</a></div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By {user.firstName} {user.lastName}</p>
                </div>
                <div className="course--description">
                  <p>{course.description}</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <li>{course.materialsNeeded}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

//   change = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     this.setState(() => {
//       return {
//         [name]: value
//       };
//     });
//   }

//   submit = () => {
//     const { context } = this.props;
//     const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
//     const { username, password } = this.state;
//     context.actions.signIn(username, password)
//       .then( user => {
//         if (user === null) {
//           this.setState( () => {
//             return { errors: [ 'Sign-in was unsuccessful' ]};
//           })
//         }
//         else {
//           this.props.history.push(from);
//           console.log(`Success!  ${username} is now signed in!`);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         this.props.history.push('/error');
//       })

//   }

//   cancel = () => {
//     this.props.history.push('/');
//   }
}
