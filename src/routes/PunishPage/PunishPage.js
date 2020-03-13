import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import PunishForm from '../../components/PunishForm/PunishForm';

class PunishPage extends Component {
  static defaultProps = {
    match: {
      params: {
      }
    },
    history: {
      push: () => {}
    }
  }

  handlePunishSuccess = punishment => {
    this.props.history.push(`/punishments/${punishment.id}`);
  }

  render() { 
    let user = '';
    if(this.props.match.params.userName) {
      user = this.props.match.params.userName;
    }
    return ( 
      <Section className='PunishPage'>
        <h2>Punish a Player</h2>
        <PunishForm
          user={user}
          onPunishSuccess={this.handlePunishSuccess}
        />
      </Section>
    );
  }
}
 
export default PunishPage;