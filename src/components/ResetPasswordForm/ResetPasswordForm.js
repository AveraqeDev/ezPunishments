import React, { Component } from 'react';
import { Input, Button } from '../Utils/Utils';

import UserApiService from '../../services/user-api-service';

class ResetPasswordForm extends Component {
  static defaultProps = {
    onResetSucces: () => {}
  }

  state = { 
    password: '',
    confirmPassword: '',
    disableSubmit: undefined,
    error: null
   }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { userId, token } = this.props.match.params;
    const { password, confirmPassword } = e.target;
    
    UserApiService.resetPassword(userId, password.value, token)
      .then(res => {
        password.value = '';
        confirmPassword.value = '';
        this.props.onResetSucces();
      })
      .catch(error => this.setState({error}));
  }

  onPasswordChange = e => {
    const { password, confirmPassword } = this.state;

    this.setState({ error: null });

    if(!password) {
      return this.setState({disabledSubmit: 'disabled', error: 'New Password is required.'});
    }
    if(!confirmPassword) {
      return this.setState({disabledSubmit: 'disabled', error: 'Confirm New Password is required'});
    }
    
    if(password !== confirmPassword) {
      return this.setState({disabledSubmit: 'disabled', error: 'Passwords do not match.'});
    }
    return this.setState({ disableSubmit: undefined })
  }

  render() { 
    const { error } = this.state;
    return ( 
      <form
        className='ResetPasswordForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>There was an error!</p>}
        </div>
        <div className='password'>
          <label htmlFor='ResetPasswordForm__password'>
            New Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='ResetPasswordForm__password'
            onChange={this.onPasswordChange}
          ></Input>
        </div>
        <div className='confirm-password'>
          <label htmlFor='ResetPasswordForm__confirm-password'>
            Confirm New Password
          </label>
          <Input
            required
            name='confirmPassword'
            type='password'
            id='ResetPasswordForm__confirm-password'
            onChange={this.onPasswordChange}
          ></Input>
        </div>
        <Button 
        className='ResetPasswordForm__reset' 
        type='submit'
        disabled={this.state.disableSubmit}>
          Reset
        </Button>
      </form>
    );
  }
}
 
export default ResetPasswordForm;