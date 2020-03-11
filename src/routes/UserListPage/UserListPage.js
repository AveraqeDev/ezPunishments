import React, { Component } from 'react';
import DataTable from '../../components/DataTable/DataTable';
import { Section } from '../../components/Utils/Utils';

import AuthApiService from '../../services/auth-api-service';

class UserListPage extends Component {
  state = { 
    headings: [],
    rows: [], 
    error: null
   }

   componentDidMount() {
    this.setState({ error: null });
    AuthApiService.getAllUsers()
      .then(users => this.setState({
        headings: Object.keys(users[0]),
        rows: users.map(user => Object.values(user))
      }))
      .catch(error => this.setState({ error }));
   }

   renderPunishmentsTable() {
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