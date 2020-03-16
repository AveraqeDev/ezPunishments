import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';

import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';

class ResetPasswordPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

   handleResetSuccess = () => {
    this.props.history.push('/login');
   }

  render() { 
    return ( 
      <Section className='ResetPasswordPage'>
        <h2>Reset Password</h2>
        <ResetPasswordForm 
          onResetSuccess={this.handleResetSuccess}
        />
      </Section>
     );
  }
}
 
export default ResetPasswordPage;