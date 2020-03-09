import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import PunishForm from '../../components/PunishForm/PunishForm';

class PunishPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  handlePunishSuccess = punishment => {
    
  }

  render() { 
    return ( 
      <Section className='PunishPage'>
        <h2>Punish a Player</h2>
        <PunishForm
          onPunishSuccess={this.handlePunishSuccess}
        />
      </Section>
    );
  }
}
 
export default PunishPage;