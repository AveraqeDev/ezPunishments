import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  
  handleLogoutClick = () => {

  }

  renderLogoutLink() {

  }

  renderLoginLink() {

  }

  renderNav() {
    
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
        {this.renderLoginLink()}
      </nav>
     );
  }
}
 
export default Header;