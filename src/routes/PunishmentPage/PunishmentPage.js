import React, { Component } from 'react';
import PunishmentContext from '../../contexts/PunishmentContext';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section, Button } from '../../components/Utils/Utils';

import Confirm from '../../components/Confirm/Confirm';

import moment from 'moment';

class PunishmentPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  state = {
    edit: false
  }

  static contextType = PunishmentContext;

  componentDidMount() {
    const { punishmentId } = this.props.match.params;
    this.context.clearError();
    PunishmentApiService.getPunishment(punishmentId)
      .then(this.context.setPunishment)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearPunishment();
  }

  handleEditClick = e => {
    e.preventDefault();

    this.setState({edit:true })
  }

  handleRemoveClick = e => {
    const newPunishmentFields = {
      active: 'false'
    }
    PunishmentApiService.updatePunishment(this.props.match.params.punishmentId, newPunishmentFields)
      .then(res => {
        this.context.setPunishment({...res})
      })
  }

  renderEditMode() {

  }

  renderStaticMode() {
    const { id, name, reason, proof, punished_by, removed_by, active, expires, date_punished, updated } = this.context.punishment;
    return (
      <Confirm title='Confirm' description='Are you sure?'>
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
    const { error, punishment } = this.context;
    const { edit } = this.state;
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