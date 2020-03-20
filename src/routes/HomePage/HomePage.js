import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import DataTable from '../../components/DataTable/DataTable';
import PunishmentApiService from '../../services/punishment-api-service';
import TokenService from '../../services/token-service';
import Modal from '../../components/Modal/Modal';
import Header from '../../components/Header/Header';

import './HomePage.css';

class HomePage extends Component {

  state = {
    punishments: [],
    showModal: false,
    error: null
  }

  componentDidMount() {
    this.setState({ error: null });
    PunishmentApiService.getRecentPunishments()
      .then(punishments => this.setState({punishments}))
      .catch(error => this.setState({error}));

    setTimeout(() => {
      this.setState({
        showModal: true
      });
    }, 2000);
  }

  renderPunishments() {
    const { error } = this.state;
    let content = <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error.message}</p>
    } else {
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
      if(rows.length > 0) {
        content = <DataTable headings={headings} rows={rows} />
      } else {
        content = <p className='no-data'>No Punishments Found</p>
      }
    }

    return content;
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  render() { 
    return ( 
      <>
        {TokenService.hasAuthToken()
          ? null
          : <Modal
              className='Modal'
              header='Welcome!'
              show={this.state.showModal}
              close={this.handleCloseModal}
            >
              <p>Here you are able to easily manage the players, and their punishments, on your Minecraft Server!</p>
              <p>To get started you must login with the test user(`admin`) and password(`11AAaa!!`).</p>
              <p>Once logged in, you can navigate to the `Punishments` page to view a list of all punishments executed, to the `Users` page to view a list of registered users, or to the `Punish` page to execute a punishment.</p>
            </Modal>
        }
        <Section className='HomePage'>
          <Header title='Recent Punishments' />
          {this.renderPunishments()}
        </Section>
      </>
    );
  }
}
 
export default HomePage;