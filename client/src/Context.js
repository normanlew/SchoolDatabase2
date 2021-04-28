import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    unencryptedPassword: Cookies.get('password') || null,
  }

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, unencryptedPassword } = this.state;

    const value = {
      authenticatedUser,
      unencryptedPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        deleteCourse: this.deleteCourse
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // Signs in the user by calling the get route in the API
  // Saves the user and user's unencrypted password in the global state while the user is logged in
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          unencryptedPassword: password
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('password', password, {  expires: 1 });
    }
    return user;
  }

  // Signs out user by removing user's login information from the global state
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
        unencryptedPassword: null,
      };
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('password');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}