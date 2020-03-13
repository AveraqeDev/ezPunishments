import React, { Component } from 'react';
import TokenService from '../services/token-service';

const nullUser = {
  id: -1,
  username: '',
  role: ''
}

const UserContext = React.createContext({
  user: nullUser,
  token: '',
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

  componentDidMount() {
    if(this.state.user === nullUser && TokenService.hasAuthToken()) {
      this.setUser(TokenService.parseAuthToken(TokenService.getAuthToken()));
    }
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
      token: this.state.token,
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