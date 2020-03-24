import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header';
import { Button } from '../Utils/Utils';

import './UserCard.css';

const UserCard = (props) => {
  const { user, info, withControls } = props;
  return ( 
    <div className='UserCard'>
      <Link className='UserCard__header' to={`/users/${user.id}`}>
        <Header subtitle={user.user_name} />
      </Link>
      <span className='UserCard__date'>{`Created On: ${moment(user.date_created).toDate().toDateString()}`}</span>
      <div className='UserCard__details-container'>
        {info.map(detail => {
            let header = detail.replace(/^\w/, c => c.toUpperCase());
            return <p key={`${Math.random()}`}className='UserCard__detail'>{`${header.replace('_', ' ')}: ${user[detail]}`}</p>
          }
        )}
      </div>
      {withControls
        ? renderControls(user)
        : null
      }
    </div>
  );
};

const renderControls = (user) => {
  return (
    <div className='UserCard__controls'>
      <Link to={`/users/${user.id}`}>
        <Button>
          View Details
        </Button>
      </Link>
    </div>
  )
};
 
export default UserCard;
