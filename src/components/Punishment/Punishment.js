import React, { useContext } from 'react';
import moment from 'moment';

import Header from '../Header/Header';
import { Button } from '../Utils/Utils';
import Confirm from '../Modal/Confirm/Confirm';
import UserContext from '../../contexts/UserContext';

const Punishment = ({ punishment, onEdit, onRemove }) => {
  const context = useContext(UserContext);
  const { id, name, reason, proof, punished_by, removed_by, active, expires, date_punished, updated } = punishment;
    return (
      <>
        <div className='PunishmentPage__heading'>
          <Header title={name}/>
          <p>Punishment #{id}</p>
          <div className='PunishmentPage__heading-controls'>
            <Confirm title='Confirm Edit' description='Are you sure you want to edit this punishment?'>
              {confirm => (
                <Button 
                  onClick={confirm(e => onEdit(e))}
                  disabled={context.isAdmin() ? undefined : 'disabled'}
                >
                  Edit
                </Button>
              )}
            </Confirm>
            <Confirm title='Confirm Removal' description='Are you sure you want to unban this player?'>
              {confirm => (
                <Button 
                  onClick={confirm(e => onRemove(e))}
                  disabled={active && context.isAdmin() ? undefined : 'disabled'}
                >
                  Remove
                </Button>
              )}
            </Confirm>
          </div>
        </div>
        <div className='PunishmentPage__punishment'>
          <p><strong>Reason:</strong> {reason}</p>
          <p><strong>Proof:</strong> {proof}</p>
          <p><strong>Punished By:</strong> {punished_by}</p>
          <p><strong>Removed By:</strong> {removed_by ? removed_by : 'N/A'}</p>
          <p><strong>Active:</strong> {active ? 'Yes' : 'No'}</p>
          <p><strong>Expires:</strong> {expires ? moment(expires).format('YYYY-MM-DD h:mm:ss') : 'Never'}</p>
          <p><strong>Date Punished:</strong> {moment(date_punished).format('YYYY-MM-DD h:mm:ss')}</p>
          <p><strong>Updated:</strong> {updated ? moment(updated).format('YYYY-MM-DD h:mm:ss') : 'N/A'}</p>
        </div>
      </>
    )
}
 
export default Punishment;