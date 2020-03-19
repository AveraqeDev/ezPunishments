import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section, Button } from '../../components/Utils/Utils';
import DataTable from '../../components/DataTable/DataTable';

import './PunishmentListPage.css';

class PunishmentListPage extends Component {
  state = {
    punishmentList: [],
    error: null
  }

  componentDidMount() {
    this.setState({ error: null });
    PunishmentApiService.getPunishments()
      .then(punishmentList => this.setState({punishmentList}))
      .catch(error => this.setState({error}));
  }

  renderPunishmentsTable() {
    const headings = [
      'ID',
      'IGN',
      'Reason',
      'Punished By',
      'Active',
      'Expires'
    ];
    const rows = this.state.punishmentList.map(punishment => [
      punishment.id,
      punishment.name,
      punishment.reason,
      punishment.punished_by,
      (punishment.active ? 'Yes' : 'No'),
      (punishment.expires ? new Date(punishment.expires).toLocaleDateString() : 'Never'),
      (<Link className='PunishmentListPage__button' to={`/punishments/${punishment.id}`}>View Punishment</Link>)
    ]);
    return(
      <DataTable headings={headings} rows={rows} />
    )
  }

  render() { 
    const { error } = this.state;
    return ( 
      <Section className='PunishmentListPage'>
        <h2>Punishments</h2>
        {error
          ? <p className='red'>There was an error, please try again</p>
          : this.renderPunishmentsTable()
        }
      </Section>
    );
  }
}
 
export default PunishmentListPage;