import React, { Component } from 'react';

const nullUser = {
  id: -1,
  username: '',
  role: ''
}

const UserContext = React.createContext({
  user: nullUser,
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  clearUser: () => {},
  isStaff: () => {},
  isAdmin: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  state = {
    user: nullUser,
    error: null
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user });
  }

  clearUser = () => {
    this.setUser(nullUser);
  }

  isStaff = () => {
    return this.state.user.role === 'staff' || this.state.user.role === 'admin';
  }

  isAdmin = () => {
    return this.state.user.role === 'admin';
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      clearUser: this.clearUser,
      isStaff: this.isStaff,
      isAdmin: this.isAdmin
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}