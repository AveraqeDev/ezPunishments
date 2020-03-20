import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import { Section } from '../../components/Utils/Utils';

import UserApiService from '../../services/user-api-service';

import './UserListPage.css';
import Header from '../../components/Header/Header';

class UserListPage extends Component {
  state = { 
    users: [],
    error: null
   }

   componentDidMount() {
    this.setState({ error: null });
    UserApiService.getAllUsers()
      .then(users => this.setState({ users }))
      .catch(error => this.setState({ error }));
   }

  renderUsers() {
    const { error } = this.state;
    let content = <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error.message}</p>
    } else {
      const headings = [
        'ID',
        'Email',
        'Username',
        'Role',
        'Date Created',
        'Controls'
      ];
      const rows = this.state.users.map(user => [
        user.id,
        user.email,
        user.user_name,
        user.user_role,
        new Date(user.date_created).toLocaleString(),
        (<Link className='DataTable__button' to={`/users/${user.id}`}>View</Link>)
      ]);
      if(rows.length > 0) {
        content = <DataTable headings={headings} rows={rows} />
      } else {
        content = <p className='no-data'>No Users found</p>
      }
    }

    return content;
  }

  render() { 
    return ( 
      <Section className='UserListPage'>
        <Header title='Users' />
        {this.renderUsers()}
      </Section>
    );
  }
}
 
export default UserListPage;