import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section, Button } from '../../components/Utils/Utils';
import UserApiService from '../../services/user-api-service';
import PunishmentApiService from '../../services/punishment-api-service';
import UserContext from '../../contexts/UserContext';

import Header from '../../components/Header/Header';
import DataTable from '../../components/DataTable/DataTable';

import './UserPage.css';

class UserPage extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  state = {
    user: {},
    punishments: [],
    executedPunishments: [],
    error: null
  }

  static contextType = UserContext;

  componentDidMount() {
    this.setState({error: null});
    UserApiService.getById(this.props.match.params.userId)
      .then(user => {
        PunishmentApiService.getUserPunishments(user)
          .then(punishments => {
            PunishmentApiService.getPunishmentsByUser(user)
              .then(executedPunishments => {
                this.setState({
                  user,
                  punishments,
                  executedPunishments
                })
              })
              .catch(error => this.setState({error: error.error}));
          })
          .catch(error => this.setState({error: error.error}));
      })
      .catch(error => this.setState({error: error.error}));
    }

  renderPunishments(executed) {
    const punishments = (executed ? this.state.executedPunishments : this.state.punishments);
    let content = <p className='no-data'>No Punishments Found</p>;
    let headings = [
      'ID',
      (executed ? 'Username' : 'Punished_by'),
      'Reason',
      'Active',
      'Punished On',
      'Expires On',
      'Controls'
    ];
    let rows = punishments.map(punishment => [
      punishment.id,
      (executed ? punishment.name : punishment.punished_by),
      punishment.reason,
      (punishment.active ? 'Yes' : 'No'),
      new Date(punishment.date_punished).toLocaleDateString(),
      (punishment.expires ? new Date(punishment.expires).toLocaleDateString() : 'Never'),
      (<Link className='DataTable__button' to={`/punishments/${punishment.id}`}>View</Link>)
    ]);
    if(rows.length > 0) {
      content = <DataTable headings={headings} rows={rows} />
    }
    return (
      content
    )
  }

  handleStaffClick = e => {
    let user_role = 'staff';
    if(this.state.user.user_role === 'staff') {
      user_role = 'member';
    }
    UserApiService.updateUser(this.state.user.id, {user_role})
      .then(() =>
        this.setState({
          user: {
            ...this.state.user,
            user_role
          }
        })
      )
      .catch(error => this.setState({error: error.error}));
  }

  renderUser() {
    const { user } = this.state;
    return (
      <>
        <div className='UserPage__heading'>
          <Header title={user.user_name} />
          <div className='UserPage__heading-controls'>
            {this.context.isStaff() && user.user_role === 'member'
              ? <Link className='DataTable__button' to={`/punish/${user.user_name}`}>Punish Player</Link>
              : null}
            {this.context.isAdmin()
              ? (user.user_role === 'member'
                  ? <Button onClick={this.handleStaffClick}>Set Staff</Button>
                  : <Button onClick={this.handleStaffClick}>Remove Staff</Button>)
              : ''}
          </div>
        </div>
        <div className='UserPage__body'>
          {user.user_role !== 'member'
            ? <Header subtitle='Executed Punishments' /> 
            : <Header subtitle='Punishment History' />}
          {user.user_role !== 'member'
            ? this.renderPunishments(true) 
            : this.renderPunishments(false)}
        </div>
      </>
    )
  }

  render() { 
    const { error } = this.state;
    let content = <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error}</p>
    } else {
      content = this.renderUser();
    }
    return ( 
      <Section className='UserPage'>
        {content}
      </Section>
    );
  }
}
 
export default UserPage;