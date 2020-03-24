import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

import './LoginForm.css';

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
        this.setState({ error: error.error });
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
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='username'>
          <label htmlFor='LoginForm__username'>
            Username <Required/>
          </label>
          <Input
            required
            name='username'
            id='LoginForm__username'
          ></Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password <Required/> <Link className='LoginForm__forgot' to='/forgot-password'>Forgot?</Link>
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
        <p className='LoginForm__not_member'>Not a member? <Link className='LoginForm__register' to='/register'>Sign up now</Link></p>
      </form>
    );
  }
}
 
export default LoginForm;