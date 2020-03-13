import React, { Component } from 'react';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section, Button, Input } from '../../components/Utils/Utils';

import Confirm from '../../components/Confirm/Confirm';

import moment from 'moment';

class PunishmentPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  state = {
    punishment: {},
    error: null,
    edit: false,
    type: 'h'
  }

  componentDidMount() {
    this.setState({ error: null })
    const { punishmentId } = this.props.match.params;
    PunishmentApiService.getPunishment(punishmentId)
      .then(punishment => this.setState({punishment}))
      .catch(error => this.setState({error}));
  }

  handleEditClick = e => {
    this.setState({ edit: true });
  }

  handleRemoveClick = e => {
    const newPunishmentFields = {
      active: 'false',
      updated: moment(new Date()).utc().toISOString()
    }
    PunishmentApiService.updatePunishment(this.props.match.params.punishmentId, newPunishmentFields)
      .then(punishment => {
        this.setState({ punishment: {...punishment} })
      })
  }

  handleEditCancel = e => {
    e.preventDefault();
    this.setState({ edit: false });
  }

  handleEditSave = e => {
    e.preventDefault();

    const { punishment } = this.state;

    const { reason, proof, punished_by, removed_by, length, type } = e.target;

    this.setState({ error: null });

    let newExpires = null;
    if(type.value !== 'Permanent')
      newExpires = moment(new Date(punishment.expires)).add(parseInt(length.value || 0), type.value).utc().toISOString();

    const updated = moment(new Date()).utc().toISOString();

    const newPunishmentFields = { 
      reason: reason.value || punishment.reason, 
      proof: proof.value || punishment.proof, 
      punished_by: punished_by.value || punishment.punished_by, 
      removed_by: removed_by.value || punishment.removed_by, 
      newExpires,
      updated
    };
    PunishmentApiService.updatePunishment(this.props.match.params.punishmentId, newPunishmentFields)
      .then(punishment => {
        this.setState({ punishment: {...punishment}, edit: false });
      })
  }

  handleTypeChange = e => {
    let type = e.target.value;
    this.setState({
      type
    });
  }

  renderEditMode() {
    const { id, name, reason, proof, punished_by, removed_by, active, expires, date_punished, updated } = this.state.punishment;
    return (
      <Confirm title='Confirm Save' description='Are you sure you want to save these changes?'>
        {confirm => (
          <form className='PunishmentPage__punishment' onSubmit={e => confirm(this.handleEditSave(e))}>
            <div className='PunishmentPage__heading'>
              <h2>{name}</h2>
              <p>Punishment #{id}</p>
              <Button onClick={this.handleEditCancel}>
                Cancel
              </Button>
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
                  <p><strong>Expires:</strong> {moment(expires).format('YYYY-MM-DD h:mm:ss')}</p>
                  <p>(Add time)</p>
                </label>
                <Input
                  name='length'
                  type='number'
                  id='PunishmentPage__expires'
                  placeholder='1'
                  disabled={this.state.type === 'Permanent' ? 'disabled' : undefined}
                >
                </Input>
                <select name='type' className='PunishmentPage__expires-type' onChange={this.handleTypeChange}>
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

  renderStaticMode() {
    const { id, name, reason, proof, punished_by, removed_by, active, expires, date_punished, updated } = this.state.punishment;
    return (
      <Confirm title='Confirm Removal' description='Are you sure you want to remove this punishment?'>
        {confirm => (
          <>
            <div className='PunishmentPage__heading'>
              <h2>{name}</h2>
              <p>Punishment #{id}</p>
              <Button onClick={this.handleEditClick}>
                Edit
              </Button>
              <Button 
                onClick={confirm(this.handleRemoveClick)}
                disabled={active ? undefined : 'disabled'}
              >
                Remove
              </Button>
            </div>
            <div className='PunishmentPage__punishment'>
              <p><strong>Reason:</strong> {reason}</p>
              <p><strong>Proof:</strong> {proof}</p>
              <p><strong>Punished By:</strong> {punished_by}</p>
              <p><strong>Removed By:</strong> {removed_by ? removed_by : 'N/A'}</p>
              <p><strong>Active:</strong> {active ? 'Yes' : 'No'}</p>
              <p><strong>Expires:</strong> {moment(expires).format('YYYY-MM-DD h:mm:ss')}</p>
              <p><strong>Date Punished:</strong> {moment(date_punished).format('YYYY-MM-DD h:mm:ss')}</p>
              <p><strong>Updated:</strong> {updated ? moment(updated).format('YYYY-MM-DD h:mm:ss') : 'N/A'}</p>
            </div>
          </>
        )}
      </Confirm>
    )
  }

  render() { 
    const { punishment, error, edit } = this.state;
    let content;
    if(error) {
      content = (error.error === 'Punishment doesn\'t exist')
        ? <p className='red'>Punishment not found</p>
        : <p className='red'>There was an error</p>
    } else if(!punishment.id) {
      content = <div className='loading' />
    } else if(edit) {
      content = this.renderEditMode();
    } else {
      content = this.renderStaticMode();
    }
    return ( 
      <Section className='PunishmentPage'>
        {content}
      </Section>
    );
  }
}
 
export default PunishmentPage;