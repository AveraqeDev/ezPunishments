import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section } from '../../components/Utils/Utils';
import DataTable from '../../components/DataTable/DataTable';

import './PunishmentListPage.css';
import Header from '../../components/Header/Header';

class PunishmentListPage extends Component {
  state = {
    punishments: [],
    error: null
  }

  componentDidMount() {
    this.setState({ error: null });
    PunishmentApiService.getPunishments()
      .then(punishments => this.setState({punishments}))
      .catch(error => this.setState({error}));
  }

  renderPunishments() {
    const { punishments, error } = this.state;
    let content = <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error.message}</p>
    } else {
      const headings = [
        'ID',
        'IGN',
        'Reason',
        'Punished By',
        'Active',
        'Expires',
        'Controls'
      ];
      const rows = punishments.map(punishment => [
        punishment.id,
        punishment.name,
        punishment.reason,
        punishment.punished_by,
        (punishment.active ? 'Yes' : 'No'),
        (punishment.expires ? new Date(punishment.expires).toLocaleDateString() : 'Never'),
        (<Link className='DataTable__button' to={`/punishments/${punishment.id}`}>View</Link>)
      ]);
      if(rows.length > 0) {
        content = <DataTable headings={headings} rows={rows} />
      } else {
        content = <p className='no-data'>No Punishments Found</p>
      }
    }
    return content;
  }

  render() { 
    return ( 
      <Section className='PunishmentListPage'>
        <Header title='Punishments' />
        {this.renderPunishments()}
      </Section>
    );
  }
}
 
export default PunishmentListPage;