import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../Utils/Utils';
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
        this.props.onLoginSuccess(res.authToken);
      })
      .catch(error => {
        this.setState({ error });
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
          {error && <p className='red'>There was an error!</p>}
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
        <Button className='LoginForm__login' type='submit'>
          Login
        </Button>
        <p>Forgot Password?</p>
        <Link className='LoginForm__forgot' to='/forgot-password'>Reset Password</Link>
        <p>Don't have an account?</p>
        <Link className='LoginForm__register' to='/register'>Sign up</Link>
      </form>
    );
  }
}
 
export default LoginForm;