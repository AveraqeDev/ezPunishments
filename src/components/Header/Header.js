import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

import './Header.css';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';

class Header extends Component {
  
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  state = {
    navOpen: false
  }

  static contextType = UserContext;

  handleLogoutClick = () => {
    this.setState({navOpen: false});
    TokenService.clearAuthToken();
    this.context.clearUser();
    this.props.history.push('/');
  }

  renderLogoutLink() {
    return (
      <div className='Header__log'>
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

  setOpen = (navOpen) => {
    this.setState({navOpen});
  }

  render() { 
    const { navOpen } = this.state;
    return ( 
      <nav className='Header'>
        <h1>
          <Link
           className='Header__logo'
           to='/'>
            eZPunishments
            {' '}
            <FontAwesomeIcon className='Header__logo_icon' icon='gavel' />
          </Link>
        </h1>
        <Burger open={navOpen} setOpen={this.setOpen} />
        <Menu open={navOpen} setOpen={this.setOpen} onLogout={this.handleLogoutClick} isStaff={this.context.isStaff} isAdmin={this.context.isAdmin} />
      </nav>
     );
  }
}
 
export default Header;