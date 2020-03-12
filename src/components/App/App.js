import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
//import PrivateRoute from '../Utils/PrivateRoute';
import StaffOnlyRoute from '../Utils/StaffOnlyRoute';
import AdminOnlyRoute from '../Utils/AdminOnlyRoute';

import Header from '../Header/Header';
import HomePage from '../../routes/HomePage/HomePage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';

import PunishPage from '../../routes/PunishPage/PunishPage';
import PunishmentPage from '../../routes/PunishmentPage/PunishmentPage';
import PunishmentListPage from '../../routes/PunishmentListPage/PunishmentListPage';

import UserListPage from '../../routes/UserListPage/UserListPage';

class App extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return {
      hasError: true
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <Switch>
            <Route
              exact
              path='/'
              component={HomePage}
            />

            <PublicOnlyRoute
              path='/login'
              component={LoginPage}
            />
            <PublicOnlyRoute
              path='/register'
              component={RegistrationPage}
            />

            <StaffOnlyRoute
              path='/punish'
              component={PunishPage}
            />
            <StaffOnlyRoute
              exact
              path='/punishments'
              component={PunishmentListPage}
            />
            <StaffOnlyRoute
              path='/punishments/:punishmentId'
              component={PunishmentPage}
            />

            <AdminOnlyRoute
              path='/users'
              component={UserListPage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;
