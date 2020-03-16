import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';

import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';

class ForgotPasswordPage extends Component {

  state = {
    success: false
  }

  handleForgotPasswordSuccess = () => {
    this.setState({success: true});
  }

  render() { 
    const { success } = this.state;
    return ( 
      <Section className='ForgotPasswordPage'>
        <h2>Forgot Password</h2>  
        <p>It happens to the best of us</p>
        { success
            ? (<>
                <h3>Email sent!</h3>
                <p>Please check your email for a link to reset your password!</p>
               </>
              )
            : <ForgotPasswordForm
                onForgotPasswordSuccess={this.handleForgotPasswordSuccess}
              />
        }
      </Section>
     );
  }
}
 
export default ForgotPasswordPage;