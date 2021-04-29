import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    courseId: '',
    errors: [],
    course: {},
    user: {},
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses/' + this.props.match.params.id)
    .then(response => response.json())
    .then(data => {
        this.setState ({ 
            courseId: data.id,
            user: data.User,
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
        });
    });
}

  render() {
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
        user,
    } = this.state;

    return (
      <div id="root">
        <div>
            <hr />
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                <div>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            className="input-title course--title--input" 
                                            onChange={this.change} 
                                            value={title} />
                                    </div>
                                    <p>By {user.firstName} {user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea 
                                            id="description" 
                                            name="description" 
                                            className="" 
                                            onChange={this.change} 
                                            value={description}>
                                        </textarea>
                                    </div>
                                </div>
                                </div>
                                <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                onChange={this.change} 
                                                value={estimatedTime} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                className="" 
                                                onChange={this.change} 
                                                value={materialsNeeded}>
                                            </textarea>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                            </div>         
                        </React.Fragment>
                    )} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

    // Updates the course information in the database
    // Only the course creator is allowed update the course
    submit = () => {
        const { context } = this.props;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            courseId,
        } = this.state;


        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            id: courseId,
        };

        const authUser = context.authenticatedUser;
        const pass = context.unencryptedPassword;
            

        context.data.updateCourse(course, authUser.username, pass)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                    }
                else {
                    this.props.history.push('/courses/' + courseId);
                }
            })
            .catch( err => {
                this.props.history.push('/error');
            });
    }

    // Cancel the course update and return to page with list of courses
    cancel = () => {
        this.props.history.push('/');
    }

    // Update the course attributes in state immediately upon changes in the UI
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

    this.setState(() => {
        return {
        [name]: value
        };
    });
  }
}
