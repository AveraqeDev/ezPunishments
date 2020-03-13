import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

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
        <h2>Register</h2>
        <RegistrationForm 
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
     );
  }
}
 
export default RegistrationPage;