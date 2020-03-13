import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import { Section } from '../../components/Utils/Utils';

class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  static contextType = UserContext;

  handleLoginSuccess = token => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from ||'/';

    TokenService.saveAuthToken(token);
    this.context.setUser(TokenService.parseAuthToken(token));

    history.push(destination);
  }

  render() { 
    return ( 
      <Section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    );
  }
}
 
export default LoginPage;