import React, { Component } from 'react';
import { Input, Button } from '../Utils/Utils';

import UserApiService from '../../services/user-api-service';

class ForgotPasswordForm extends Component {
  
  static defaultProps = {
    onForgotPasswordSuccess: () => {}
  }

  state = {
    error: null
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({error: null});

    const { username } = e.target;

    UserApiService.resetPassword(username.value)
      .then(res => {
        if(res.success) {
          username.value = '';
          this.props.onForgotPasswordSuccess();
        } else {
          this.setState({error: res.error})
        }
      })
      .catch(error => this.setState({error}));
  }

  render() { 
    const { error } = this.state;
    return ( 
      <form
        className='ForgotPasswordForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error.message}</p>}
        </div>
        <div className='username'>
          <label htmlFor='ForgotPasswordForm__username'>
            Username
          </label>
          <Input
            required
            name='username'
            id='ForgotPasswordForm__username'
          ></Input>
        </div>
        <Button
        className='ForgotPasswordForm__submit' 
        type='submit'>
          Reset Password
        </Button>
      </form>
     );
  }
}
 
export default ForgotPasswordForm;