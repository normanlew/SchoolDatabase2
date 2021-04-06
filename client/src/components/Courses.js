import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
  state = {
    courses: [],
  }

  componentDidMount() {
      fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => {
          this.setState ({ 
              courses: data
          });
      });
  }

  render() {
    const {
      courses,
    } = this.state;

    let courseListing = courses.map(course => 
        <div className="grid-33" key={course.id}>
        <a className="course--module course--link" href={"/courses/" + course.id}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            </a>
        </div>
    );

    return (
      <div className="bounds">
          {courseListing}
          <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
      </div>
    );
  }

  // goToCoursePage = (id) => {
  //   this.props.history.push('/courses/' + id);
  // }

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
