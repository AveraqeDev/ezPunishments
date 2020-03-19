import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import StaffOnlyRoute from '../Utils/StaffOnlyRoute';
import AdminOnlyRoute from '../Utils/AdminOnlyRoute';

import Header from '../Header/Header';
import HomePage from '../../routes/HomePage/HomePage';

import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import ForgotPasswordPage from '../../routes/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../routes/ResetPasswordPage/ResetPasswordPage';

import ProfilePage from '../../routes/ProfilePage/ProfilePage';

import PunishPage from '../../routes/PunishPage/PunishPage';
import PunishmentPage from '../../routes/PunishmentPage/PunishmentPage';
import PunishmentListPage from '../../routes/PunishmentListPage/PunishmentListPage';

import UserListPage from '../../routes/UserListPage/UserListPage';
import UserPage from '../../routes/UserPage/UserPage';

import UserContext from '../../contexts/UserContext';

class App extends Component {
  state = {
    error: null
  }

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    console.error(error);
    return {
      error: error
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.error && <p className='red'>{this.state.error.message}</p>}
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
            <PublicOnlyRoute
              path='/forgot-password'
              component={ForgotPasswordPage}
            />
            <PublicOnlyRoute
              path='/reset-password/:userId/:token'
              component={ResetPasswordPage}
            />

            <PrivateRoute
              path='/profile'
              component={ProfilePage}
            />

            <StaffOnlyRoute
              exact
              path='/punish'
              component={PunishPage}
            />
            <StaffOnlyRoute
              path='/punish/:userName'
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
            <StaffOnlyRoute
              path='/users/:userId'
              component={UserPage}
            />

            <AdminOnlyRoute
              exact
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
