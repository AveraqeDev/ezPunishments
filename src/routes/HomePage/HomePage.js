import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import DataTable from '../../components/DataTable/DataTable';
import PunishmentApiService from '../../services/punishment-api-service';

class HomePage extends Component {
  state = {
    punishments: [],
    error: null
  }

  componentDidMount() {
    this.setState({ error: null });
    PunishmentApiService.getRecentPunishments()
      .then(punishments => this.setState({punishments}))
      .catch(error => this.setState({error}));
  }

  renderRecentPunishments() {
    const headings = [
      'Username',
      'Punished By',
      'Reason',
      'Punished On',
      'Expires On'
    ];
    const rows = this.state.punishments.map(punishment => [
      punishment.name,
      punishment.punished_by,
      punishment.reason,
      new Date(punishment.date_punished).toLocaleDateString(),
      (punishment.expires ? new Date(punishment.expires).toLocaleDateString() : 'Never')
    ]);
    return (
      <DataTable headings={headings} rows={rows} />
    );
  }

  render() { 
    const { error } = this.state;
    return ( 
      <Section className='HomePage'>
        <h2>Recent Punishments</h2>
        {error 
          ? <p className='red'>There was an error!</p>
          : this.renderRecentPunishments()}
      </Section>
    );
  }
}
 
export default HomePage;