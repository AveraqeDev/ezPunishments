import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = {
    error: null
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;

    AuthApiService.postLogin({
      user_name: username.value,
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }
  
  render() { 
    const { error } = this.state;
    return ( 
      <form
        className='LoginForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='username'>
          <label htmlFor='LoginForm__username'>
            Username
          </label>
          <Input
            required
            name='username'
            id='LoginForm__username'
          ></Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'
          ></Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    );
  }
}
 
export default LoginForm;