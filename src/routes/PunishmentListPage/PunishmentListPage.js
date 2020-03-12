import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PunishmentListContext from '../../contexts/PunishmentListContext';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section } from '../../components/Utils/Utils';
import DataTable from '../../components/DataTable/DataTable';

class PunishmentListPage extends Component {
  state = {
    headings: [],
    rows: []
  }
  
  static contextType = PunishmentListContext;

  componentDidMount() {
    this.context.clearError();
    PunishmentApiService.getPunishments()
      .then(this.context.setPunishmentList)
      .then(() => {
        this.setState({ 
          headings: [
            'ID',
            'IGN',
            'Reason',
            'Punished By',
            'Active',
            'Expires'
          ],
          rows: this.context.punishmentList.map(punishment => [
            punishment.id,
            punishment.name,
            punishment.reason,
            punishment.punished_by,
            (punishment.active ? 'Yes' : 'No'),
            new Date(punishment.expires).toLocaleDateString(),
            (<Link className='PunishmentListPage__button' to={`/punishments/${punishment.id}`}>View</Link>)
          ])
        });
      })
      .catch(this.context.setError);
  }

  renderPunishmentsTable() {
    return(
      <DataTable headings={this.state.headings} rows={this.state.rows} />
    )
  }

  render() { 
    const { error } = this.context;
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