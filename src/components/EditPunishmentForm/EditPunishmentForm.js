import React, { useState } from 'react';
import moment from 'moment';

import Heading from '../Header/Header'
import { Input, Button } from '../Utils/Utils';
import Confirm from '../Modal/Confirm/Confirm';

const EditPunishmentForm = ({ punishment, onCancel, onSave }) => {
  const { type, setType } = useState('h');
  const { id, name, reason, proof, punished_by, removed_by, active, expires, date_punished, updated } = punishment;
    return (
      <Confirm title='Confirm Save' description='Are you sure you want to save these changes?'>
        {confirm => (
          <form className='PunishmentPage__punishment' onSubmit={e => confirm(onSave(e))}>
            <div className='PunishmentPage__heading'>
              <Heading title={name} />
              <p>Punishment #{id}</p>
              <Confirm title='Confirm Cancel' description='Are you sure you want to cancel? Any made changes will not be saved.'>
                {confirm => (
                  <Button onClick={e => confirm(onCancel(e))}>
                    Cancel
                  </Button>
                )}
              </Confirm>
              <Button type='submit'>
                Save
              </Button>
            </div>
            <div className='reason'>
              <label htmlFor='PunishmentPage__reason'>
                <strong>Reason:</strong>
              </label>
              <Input 
                placeholder={reason} 
                name='reason' 
                type='text' 
                id='PunishmentPage__reason'
              >
              </Input>
            </div>
            <div className='proof'>
              <label htmlFor='PunishmentPage__proof'>
                <strong>Proof:</strong>
              </label>
              <Input 
                placeholder={proof} 
                name='proof' 
                type='text' 
                id='PunishmentPage__proof'
              >
              </Input>
            </div>
            <div className='punished_by'>
              <label htmlFor='PunishmentPage__punished_by'>
                <strong>Punished By:</strong>
              </label>
              <Input 
                placeholder={punished_by} 
                name='punished_by' 
                type='text' 
                id='PunishmentPage__punished_by'
              >
              </Input>
            </div>
            <div className='removed_by'>
              <label htmlFor='PunishmentPage__removed_by'>
                <strong>Removed By:</strong>
              </label>
              <Input 
                placeholder={removed_by} 
                name='removed_by' 
                type='text' 
                id='PunishmentPage__removed_by'
              >
              </Input>
            </div>
            
            <p><strong>Active:</strong> {active ? 'Yes' : 'No'}</p>

            <div className='expires'>
              <label htmlFor='PunishmentPage__expires'>
                <p><strong>Expires:</strong> {expires ? moment(expires).format('YYYY-MM-DD h:mm:ss') : 'Never'}</p>
                <p>(Add time)</p>
              </label>
              <input
                name='length'
                type='number'
                id='PunishmentPage__expires'
                placeholder='1'
                disabled={type === 'Permanent' ? 'disabled' : undefined || !expires}
              >
              </input>
              <select name='type' className='PunishmentPage__expires-type' onChange={e => setType(e.target.value)} disabled={!expires}>
                <option value='h'>Hours</option>
                <option value='d'>Days</option>
                <option value='w'>Weeks</option>
                <option value='Permanent'>Permanent</option>
              </select>
            </div>

            <p><strong>Date Punished:</strong> {moment(date_punished).format('YYYY-MM-DD h:mm:ss')}</p>
            <p><strong>Updated:</strong> {updated ? moment(updated).format('YYYY-MM-DD h:mm:ss') : 'N/A'}</p>
          </form>
        )}
      </Confirm>
    )
}
 
export default EditPunishmentForm;

