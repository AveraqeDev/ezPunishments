import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Section } from '../../components/Utils/Utils';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import './RegistrationPage.css';

class RegistrationPage extends Component {
 
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = () => {
    this.props.history.push('/login');
  }

  render() { 
    return ( 
      <Section className="RegistrationPage">
        <h1>
          <Link
          className='RegistrationPage__logo'
          to='/'>
            eZPunishments
            {' '}
            <FontAwesomeIcon className='RegistrationPage__logo_icon' icon='gavel' />
          </Link>
        </h1>
        <p>Register</p>
        <RegistrationForm 
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
     );
  }
}
 
export default RegistrationPage;