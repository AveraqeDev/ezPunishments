import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';

import UserApiService from '../../services/user-api-service';

import './UserListPage.css';
import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';

class UserListPage extends Component {
  state = { 
    users: [],
    error: null
   }

   componentDidMount() {
    this.setState({ error: null });
    UserApiService.getAllUsers()
      .then(users => this.setState({ users }))
      .catch(error => this.setState({ error: error.error }));
   }

  renderUsers() {
    const { error, users } = this.state;
    let content = <div className='loading' />;
    if(error) {
      content = <p className='no-data'>{error}</p>
    } else if(users[0]) {
      const info = [
        'id',
        'email',
        'user_role'
      ];
      content = users.map(user => <UserCard key={user.id} user={user} info={info} withControls={true} />);
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