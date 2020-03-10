import React, { Component } from 'react';
import PunishmentContext from '../../contexts/PunishmentContext';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section, Button } from '../../components/Utils/Utils';

import moment from 'moment';

class PunishmentPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
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

  renderPunishment() {
    const { id, name, reason, proof, punished_by, removed_by, active, expires, date_punished, updated } = this.context.punishment;
    return (
      <>
        <div className='PunishmentPage__heading'>
          <h2>{name}</h2>
          <h3>#{id}</h3>
          <Button>
            Edit
          </Button>
          <Button>
            Remove
          </Button>
        </div>
        <div className='PunishmentPage__punishment'>
          <p><strong>Reason:</strong> {reason}</p>
          <p><strong>Proof:</strong> {proof}</p>
          <p><strong>Punished By:</strong> {punished_by}</p>
          <p><strong>Removed By:</strong> {removed_by}</p>
          <p><strong>Active:</strong> {active}</p>
          <p><strong>Expires:</strong> {moment(expires).format('YYYY-MM-DD h:mm:ss')}</p>
          <p><strong>Date Punished:</strong> {moment(date_punished).format('YYYY-MM-DD h:mm:ss')}</p>
          <p><strong>Updated:</strong> {moment(updated).format('YYYY-MM-DD h:mm:ss')}</p>
        </div>
      </>
    )
  }

  render() { 
    const { error, punishment } = this.context;
    let content;
    if(error) {
      content = (error.error === 'Punishment doesn\'t exist')
        ? <p className='red'>Punishment not found</p>
        : <p className='red'>There was an error</p>
    } else if(!punishment.id) {
      content = <div className='loading' />
    } else {
      content = this.renderPunishment()
    }
    return ( 
      <Section className='PunishmentPage'>
        {content}
      </Section>
    );
  }
}
 
export default PunishmentPage;