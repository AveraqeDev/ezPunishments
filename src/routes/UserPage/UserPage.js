import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section, Button } from '../../components/Utils/Utils';
import UserApiService from '../../services/user-api-service';
import PunishmentApiService from '../../services/punishment-api-service';
import UserContext from '../../contexts/UserContext';

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
              .catch(error => this.setState({error}));
          })
          .catch(error => this.setState({error}));
      })
      .catch(error => this.setState({error}));
    }

  renderPunishments(executed) {
    const punishments = (executed ? this.state.executedPunishments : this.state.punishments);
    let content = <p>No Punishments Found</p>;
    let headings = [
      'ID',
      (executed ? 'Username' : 'Punished_by'),
      'Reason',
      'Active',
      'Punished On',
      'Expires On'
    ];
    let rows = punishments.map(punishment => [
      punishment.id,
      (executed ? punishment.name : punishment.punished_by),
      punishment.reason,
      (punishment.active ? 'Yes' : 'No'),
      new Date(punishment.date_punished).toLocaleDateString(),
      (punishment.expires ? new Date(punishment.expires).toLocaleDateString() : 'Never'),
      (<Link className='PunishmentListPage__button' to={`/punishments/${punishment.id}`}>View Punishment</Link>)
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
      .catch(error => this.setState({error}));
  }

  renderUser() {
    return (
      <>
        <div className='UserPage__user_heading'>
          <h2>{this.state.user.user_name}</h2>
          <div className='UserPage__user_heading-controls'>
            {this.context.isStaff() && this.state.user.user_role === 'member'
              ? <Link to={`/punish/${this.state.user.user_name}`}>Punish Player</Link>
              : ''}
            {this.context.isAdmin()
              ? (this.state.user.user_role === 'member'
                  ? <Button onClick={this.handleStaffClick}>Set Staff</Button>
                  : <Button onClick={this.handleStaffClick}>Remove Staff</Button>)
              : ''}
          </div>
        </div>
        <div className='UserPage__user_body'>
          {this.state.user.user_role === 'member'
            ? <h3>Punishment History</h3>
            : <h3>Executed Punishments</h3>}
          {this.state.user.user_role !== 'member'
            ? this.renderPunishments(true) 
            : this.renderPunishments(false)}
        </div>
      </>
    )
  }

  render() { 
    const { error, user } = this.state;
    let content;
    if(error) {
      content = (error.error === 'User doesn\'t exist')
        ? <p className='red'>User not found</p>
        : <p className='red'>There was an error</p>
    } else if(!user) {
      content = <div className='loading' />
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