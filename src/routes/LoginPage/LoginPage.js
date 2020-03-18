import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from '../../components/LoginForm/LoginForm';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import { Section } from '../../components/Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

import './LoginPage.css';

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
    TokenService.queueCallbackBeforeExpiry(() => {
      AuthApiService.postRefreshToken();
    });
    this.context.setUser(TokenService.parseAuthToken(token));

    history.push(destination);
  }

  render() { 
    return ( 
      <div className='LoginBG'>
        <Section className='LoginPage'>
          <h1>
            <Link
            className='LoginPage__logo'
            to='/'>
              eZPunishments
              {' '}
              <FontAwesomeIcon className='LoginPage__logo_icon' icon='gavel' />
            </Link>
          </h1>
          <p>Sign In</p>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </Section>
      </div>
    );
  }
}
 
export default LoginPage;