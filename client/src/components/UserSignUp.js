import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstname" 
                  name="firstname" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastname" 
                  name="lastname" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailaddress" 
                  name="emailaddress"
                  type="type"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password" 
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input 
                  id="confirmpassword" 
                  name="confirmpassword" 
                  type="password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
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

  submit = () => {
    const { context } = this.props;
    console.log(context);

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    if (password === confirmPassword) {
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
      };

      context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors });
          }
        })
        .catch( err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }

    
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
