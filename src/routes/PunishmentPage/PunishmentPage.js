import React, { Component } from 'react';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section } from '../../components/Utils/Utils';
import UserContext from '../../contexts/UserContext';

import EditPunishmentForm from '../../components/EditPunishmentForm/EditPunishmentForm';

import moment from 'moment';

import './PunishmentPage.css';
import Punishment from '../../components/Punishment/Punishment';

class PunishmentPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  state = {
    punishment: {},
    error: null,
    edit: false
  }

  static contextType = UserContext;

  componentDidMount() {
    this.setState({ error: null })
    const { punishmentId } = this.props.match.params;
    PunishmentApiService.getPunishment(punishmentId)
      .then(punishment => this.setState({punishment}))
      .catch(error => this.setState({error: error.error}));
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
      .catch(error => this.setState({error: error.error}))
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
      .catch(error => this.setState({error: error.error}))
  }

  render() { 
    const { punishment, error, edit } = this.state;
    let content= <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error}</p>
    } else if(edit) {
      content = <EditPunishmentForm 
                  punishment={punishment} 
                  onCancel={e => this.handleEditCancel(e)} 
                  onSave={e => this.handleEditSave(e)} 
                />;
    } else {
      content = <Punishment 
                  punishment={punishment}
                  onEdit={e => this.handleEditClick(e)}
                  onRemove={e => this.handleRemoveClick(e)}
                />
    }
    return ( 
      <Section className='PunishmentPage'>
        {content}
      </Section>
    );
  }
}
 
export default PunishmentPage;