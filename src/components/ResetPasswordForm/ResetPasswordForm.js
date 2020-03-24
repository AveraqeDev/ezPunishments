import React, { Component } from 'react';
import { Input, Button, Required } from '../Utils/Utils';

import UserApiService from '../../services/user-api-service';

class ResetPasswordForm extends Component {
  static defaultProps = {
    onResetSucces: () => {},
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
    
    UserApiService.storePassword(userId, password.value, token)
      .then(res => {
        password.value = '';
        confirmPassword.value = '';
        this.props.onResetSucces();
      })
      .catch(error => this.setState({error: error.error}));
  }

  onPasswordChange = e => {
    const password = e.target.value;

    this.setState({ password });

    if(!password) {
      return this.setState({disabledSubmit: 'disabled', error: 'New Password is required.'});
    }

    return this.setState({ disableSubmit: undefined, error: null })
  }

  onConfirmPasswordChange = e => {
    const { password } = this.state;
    const confirmPassword = e.target.value;

    this.setState({ error: null, disableSubmit: undefined, confirmPassword });

    if(!confirmPassword) {
      return this.setState({disabledSubmit: 'disabled', error: 'Confirm New Password is required'});
    }
    
    if(password !== confirmPassword) {
      return this.setState({disabledSubmit: 'disabled', error: 'Passwords do not match.'});
    }
  }

  render() { 
    const { error } = this.state;
    return ( 
      <form
        className='ResetPasswordForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='password'>
          <label htmlFor='ResetPasswordForm__password'>
            New Password <Required/>
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
            Confirm New Password <Required/>
          </label>
          <Input
            required
            name='confirmPassword'
            type='password'
            id='ResetPasswordForm__confirm-password'
            onChange={this.onConfirmPasswordChange}
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