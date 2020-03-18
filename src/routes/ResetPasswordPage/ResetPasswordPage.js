import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';

import './ResetPasswordPage.css';

class ResetPasswordPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
    match: {
      params: {}
    }
  };

   handleResetSuccess = () => {
    this.props.history.push('/login');
   }

  render() { 
    return ( 
      <Section className='ResetPasswordPage'>
        <h1>
          <Link
          className='ResetPasswordPage__logo'
          to='/'>
            eZPunishments
            {' '}
            <FontAwesomeIcon className='ResetPasswordPage__logo_icon' icon='gavel' />
          </Link>
        </h1>
        <p>Reset Password</p>
        <ResetPasswordForm 
          match={this.props.match}
          onResetSuccess={this.handleResetSuccess}
        />
      </Section>
     );
  }
}
 
export default ResetPasswordPage;