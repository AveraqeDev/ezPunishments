import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import DataTable from '../../components/DataTable/DataTable';
import PunishmentApiService from '../../services/punishment-api-service';

import PopUp from '../../components/PopUp/PopUp';

import './HomePage.css';

class HomePage extends Component {
  state = {
    punishments: [],
    popup: false,
    error: null
  }

  componentDidMount() {
    this.setState({ error: null });
    PunishmentApiService.getRecentPunishments()
      .then(punishments => this.setState({punishments}))
      .catch(error => this.setState({error}));

    setTimeout(() => {
      this.showPopUp();
    }, 2000);
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

  showPopUp = () => {
    this.setState({popup: true});
  }

  hidePopUp = () => {
    this.setState({popup: false});
  }

  render() { 
    const { error } = this.state;
    return ( 
      <>
        <PopUp className='PopUp' show={this.state.popup} handleClose={this.hidePopUp}>
          <h2>Welcome!</h2>
          <p>Here you are able to easily manage the players, and their punishments, on your Minecraft Server!</p>
          <p>To get started you must login with the test user(`admin`) and password(`admin`).</p> 
          <p>Once logged in, you can navigate to the `Punishments` page to view a list of all punishments executed, to the `Users` page to view a list of registered users, or to the `Punish` page to execute a punishment.</p>
        </PopUp>
        <Section className='HomePage'>
          <h2>Recent Punishments</h2>
          {error 
            ? <p className='red'>There was an error!</p>
            : this.renderRecentPunishments()}
        </Section>
      </>
    );
  }
}
 
export default HomePage;