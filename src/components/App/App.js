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

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';

class App extends Component {
  state = {
    hasError: false
  }

  static contextType = UserContext;

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
   IdleService.setIdleCallback(this.logouFromIdle);

   // if a user is logged in
   if(TokenService.hasAuthToken()) {
     /*
      tell the idle service to register event listeners
      the event listeners are fired when a user does something, e.g. move their mouse
      if the user doesn't trigger one of those event listeners,
        the idleCallback (logout) will be invoked
     */
    IdleService.registerIdleTimerResets()

    /*
      Tell the token service to read the JWT, looking at the exp value
      and queue a timeout just before the token expires
    */
    TokenService.queueCallbackBeforeExpiry(() => {
      AuthApiService.postRefreshToken()
    });
   }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
   IdleService.unRegisterIdleResets();
   // and remove the refresh endpoint request
   TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    // remove the token from localStorage
    TokenService.clearAuthToken();
    //remove any queued calls to the refresh endpoint
    TokenService.clearCallbackBeforeExpiry();
    // remove the timeouts that auto logout when idle
    IdleService.unRegisterIdleResets();
    // reset the user
    this.context.clearUser();
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
