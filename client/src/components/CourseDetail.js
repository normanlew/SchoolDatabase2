import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";

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

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const subAddress = course.id + "/update";

    const isAuthorized = authUser && (authUser.userId === user.id);

    return (
      <div id="root">
        <div>
          <hr></hr>
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {
                    isAuthorized ? (
                      <React.Fragment>
                        <span><a className="button" href={subAddress}>Update Course</a><a className="button" onClick={this.handleDelete} href="#">Delete Course</a></span>
                        <a className="button button-secondary" href="/">Return to List</a>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <a className="button button-secondary" href="/">Return to List</a>
                      </React.Fragment>
                    )
                  }
                </div>
                
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
                  <ReactMarkdown>{course.description}</ReactMarkdown>     
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
                      <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown> 
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

  // Removes the course from the database
  // Only the owner (creator) of the course may delete it
  handleDelete = async (event) => {
    event.preventDefault();
    const {
      course,
      user
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const pass = context.unencryptedPassword;
    await context.data.deleteCourse(user.emailAddress, pass, course.id);
    this.props.history.push('/');
  }
}
