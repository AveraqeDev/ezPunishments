import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import { Section } from '../../components/Utils/Utils';

import UserApiService from '../../services/user-api-service';

class UserListPage extends Component {
  state = { 
    headings: [],
    rows: [], 
    error: null
   }

   componentDidMount() {
    this.setState({ error: null });
    UserApiService.getAllUsers()
      .then(users => this.setState({
        headings: [
          'ID',
          'Email',
          'Username',
          'Role',
          'Date Created'
        ],
        rows: users.map(user => [
          user.id,
          user.email,
          user.user_name,
          user.user_role,
          new Date(user.date_created).toLocaleString(),
          (<Link className='UserListPage__button' to={`/users/${user.id}`}>View Profile</Link>)
        ])
      }))
      .catch(error => this.setState({ error }));
   }

   renderPunishmentsTable() {
     this.state.rows.forEach(row => {
       row.push()
     })
    return(
      <DataTable headings={this.state.headings} rows={this.state.rows} />
    )
  }

  render() { 
    const { error } = this.state;
    return ( 
      <Section className='UserListPage'>
        <h2>Users</h2>
        {error
          ? <p className='red'>There was an error, please try again</p>
          : this.renderPunishmentsTable()
        }
      </Section>
    );
  }
}
 
export default UserListPage;