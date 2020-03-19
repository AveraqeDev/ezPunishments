import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import UserContext from '../../contexts/UserContext';
import DataTable from '../../components/DataTable/DataTable';

import Header from '../../components/Header/Header';

import './ProfilePage.css';

class ProfilePage extends Component {

  state = {
    punishments: [],
    error: null
  }

  static contextType = UserContext;

  renderPunishments() {
    const { punishments } = this.context;
    let content = <div className='loading' />;
    let headings = [
      'ID',
      'Punished_by',
      'Reason',
      'Active',
      'Punished On',
      'Expires On'
    ];
    let rows = punishments.map(punishment => [
      punishment.id,
      punishment.punished_by,
      punishment.reason,
      (punishment.active ? 'Yes' : 'No'),
      new Date(punishment.date_punished).toLocaleDateString(),
      new Date(punishment.expires).toLocaleDateString()
    ]);
    if(rows.length > 0) {
      content = <DataTable headings={headings} rows={rows} />
    } else {
      content = <p className='no-data'>No punishments found</p>
    }
    return (
      content
    )
  }

  renderUser() {
    return (
      <>
        <div className='ProfilePage__heading'>
          <h1>{`${this.context.user.username}'s Profile`}</h1>
        </div>
        <div className='ProfilePage__body'>
          <Header title='Punishment History' />
          {this.renderPunishments()}
        </div>
      </>
    )
  }

  render() { 
    const { error, user } = this.context;
    let content;
    if(error) {
      content = <p className='red'>{error.message}</p>
    } else if(!user) {
      content = <div className='loading' />
    } else {
      content = this.renderUser();
    }
    return ( 
      <Section className='ProfilePage'>
        {content}
      </Section>
    );
  }
}
 
export default ProfilePage;