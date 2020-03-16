import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import UserContext from '../../contexts/UserContext';
import DataTable from '../../components/DataTable/DataTable';

class ProfilePage extends Component {

  state = {
    punishments: [],
    error: null
  }

  static contextType = UserContext;

  renderPunishments() {
    const { punishments } = this.context;
    let content = <p>No Punishments Found</p>;
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
    }
    return (
      content
    )
  }

  renderUser() {
    return (
      <>
        <div className='ProfilePage__heading'>
          <h2>{this.context.user.username}</h2>
        </div>
        <div className='ProfilePage__body'>
          <h3>Punishment History</h3>
          {this.renderPunishments()}
        </div>
      </>
    )
  }

  render() { 
    const { error, user } = this.context;
    let content;
    if(error) {
      content = <p className='red'>There was an error</p>
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