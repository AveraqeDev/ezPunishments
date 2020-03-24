import React, { Component } from 'react';
import PunishmentApiService from '../../services/punishment-api-service';
import { Section } from '../../components/Utils/Utils';

import './PunishmentListPage.css';
import Header from '../../components/Header/Header';

import PunishmentCard from '../../components/PunishmentCard/PunishmentCard';

class PunishmentListPage extends Component {
  state = {
    punishments: [],
    error: null
  }

  componentDidMount() {
    this.setState({ error: null });
    PunishmentApiService.getPunishments()
      .then(punishments => this.setState({punishments}))
      .catch(error => this.setState({error: error.error}));
  }

  renderPunishments() {
    const { punishments, error } = this.state;
    let content = <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error}</p>
    } else if(punishments[0]) {
      const info = [
        'id',
        'name',
        'reason',
        'punished_by',
        'active',
        'expires'
      ];
      content = punishments.map(punishment => <PunishmentCard key={punishment.id} punishment={punishment} info={info} withControls={true} />);
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