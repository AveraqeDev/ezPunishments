import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';

import './ForgotPasswordPage.css';

class ForgotPasswordPage extends Component {

  state = {
    success: false, 
    submitted: false
  }

  handleForgotPasswordSuccess = () => {
    this.setState({success: true});
  }

  handleSubmit = () => {
    this.setState({submitted: true});
  }

  renderContent() {
    const { success, submitted } = this.state;
    let content;
    if(success) {
      content = (<>
        <h2>Email sent!</h2>
        <p>Please check your email for a link to reset your password!</p>
       </>
      );
    } else if(!success && submitted) {
      content = <div className='loading' />
    } else {
      return <ForgotPasswordForm 
              handleSubmit={this.handleSubmit}
              onForgotPasswordSuccess={this.handleForgotPasswordSuccess}
            />
    }
    return content;
  }

  render() { 
    return ( 
      <Section className='ForgotPasswordPage'>
        <h1>
          <Link
          className='ForgotPasswordPage__logo'
          to='/'>
            eZPunishments
            {' '}
            <FontAwesomeIcon className='ForgotPasswordPage__logo_icon' icon='gavel' />
          </Link>
        </h1>
        <p className='ForgotPasswordPage__title'>Forgot Password</p>  
        <p className='ForgotPasswordPage__tagline'>It happens to the best of us</p>
        {this.renderContent()}
      </Section>
     );
  }
}
 
export default ForgotPasswordPage;