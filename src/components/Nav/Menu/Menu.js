import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../../services/token-service';
import './Menu.css';

const Menu = (props) => {
  const { open, setOpen, onLogout, isStaff, isAdmin } = props;
  return (
    <nav className={'Menu'}>
      {isStaff()
        ? <Link
            className='Menu__link'
            to='/punishments'
            onClick={() => setOpen(!open)}
          >
            Punishments
          </Link>
        : ''
      }
      {isAdmin()
        ? <Link
            className='Menu__link'
            to='/users'
            onClick={() => setOpen(!open)}
          >
            Users
          </Link>
        : ''
      }
      {isStaff()
        ? <Link
            className='Menu__link'
            to='/punish'
            onClick={() => setOpen(!open)}
          >
            Punish
          </Link>
        : ''
      }

      {TokenService.hasAuthToken() 
        ? 
          (
            <>
              <Link
                className='Menu__link'
                to='/profile'
                onClick={() => setOpen(!open)}
              >
                My Profile
              </Link>
              <button
                className='Menu__link logout'
                onClick={() => onLogout()}
              >
                Logout
              </button>
            </>
          )
        : 
          (
            <>
              <Link
                className='Menu__link'
                to='/login'
                onClick={() => setOpen(!open)}
              >
                Login
              </Link>
              <Link
                className='Menu__link'
                to='/register'
                onClick={() => setOpen(!open)}
              >
                Register
              </Link>
            </>
          )
      }
    </nav>
  );
}

export default Menu;