import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            // course: data,
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
        course,
        user,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div id="root">
        <div>
            <hr />
            <div className="bounds course--detail">
                <h1>Create Course</h1>
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
                                            // placeholder="Course title..."
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
                                            // placeholder="Course description..."
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
                                                // placeholder="Hours" 
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
                                                // placeholder="List materials..."
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

    submit = () => {
        const { context } = this.props;

        const {
            // course,
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

        // console.log('course is ' + course);
        const authUser = context.authenticatedUser;
        const pass = context.unencryptedPassword;
        // console.log('unencrypted password is ' + pass);
        // console.log('authUsers email is ' + authUser.username);
            

        context.data.updateCourse(course, authUser.username, pass)
            .then( errors => {
                if (errors.length) {
                this.setState({ errors });
                console.log(errors);
                }
                else {
                console.log(`Course is updated!`);
                this.props.history.push('/');
                }
            })
            .catch( err => {
                console.log(err);
            //   this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

    this.setState(() => {
        return {
        [name]: value
        };
    });
    }

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
// }

}
