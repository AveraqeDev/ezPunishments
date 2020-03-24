import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Header from '../Header/Header';
import { Button } from '../Utils/Utils';

import './PunishmentCard.css';

const PunishmentCard = (props) => {
  const { punishment, info, withControls } = props;
  return ( 
    <div className='PunishmentCard'>
      <Link className='PunishmentCard__header' to={`/punishment/${punishment.id}`}>
        <Header subtitle={punishment.name} />
      </Link>
      <span className='PunishmentCard__date'>{punishment.updated ? `Modified On: ${moment(punishment.updated).toDate().toDateString()}` : `Applied On: ${moment(punishment.date_punished).toDate().toDateString()}`}</span>
      <div className='PunishmentCard__details-container'>
        {info.map(detail => {
            let header = detail.replace(/^\w/, c => c.toUpperCase());
            let content;
            switch(detail) {
              case 'active':
                content = punishment[detail] ? 'Yes' : 'No'
                break;
              case 'expires':
                content = punishment[detail] === null ? 'Never' : moment(punishment[detail]).toDate().toDateString();
                break;
              default:
                content = punishment[detail];
                break;
            }
            return <p key={`${Math.random()}`}className='PunishmentCard__detail'>{`${header}: ${content}`}</p>
          }
        )}
      </div>
      {withControls
        ? renderControls(punishment)
        : null
      }
    </div>
  );
};

const renderControls = (punishment) => {
  return (
    <div className='PunishmentCard__controls'>
      <Link to={`/punishments/${punishment.id}`}>
        <Button>
          View Details
        </Button>
      </Link>
    </div>
  )
};
 
export default PunishmentCard;
