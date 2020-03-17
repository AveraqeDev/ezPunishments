import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

class Header extends Component {
  
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  static contextType = UserContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearUser();
    this.props.history.push('/');
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          to='/profile'
        >
          My Profile
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/'
        >
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'
        >
          Login
        </Link>
        <Link
          to='/register'
        >
          Register
        </Link>
      </div>
    )
  }

  renderNav() {
    return (
      <ul className='Header__nav'>
        <li>
          <Link
            to='/'
          >
            Home
          </Link>
        </li>
        <li>
        <Link
            to='/punishments'
          >
            Punishments
          </Link>
        </li>
        <li>
        <Link
            to='/users'
          >
            Users
          </Link>
        </li>
        <li>
        <Link
            to='/punish'
          >
            Punish
          </Link>
        </li>
      </ul>
    )
  }

  render() { 
    return ( 
      <nav className='Header'>
        <h1>
          <Link to='/'>
            eZPunishments
            {' '}
            <FontAwesomeIcon icon='gavel' />
          </Link>
        </h1>
        {this.renderNav()}
        {this.context.user.id !== -1
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
     );
  }
}
 
export default Header;