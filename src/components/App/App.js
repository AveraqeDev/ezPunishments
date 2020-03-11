import React from 'react';
//import RegistrationPage, {  } from '../../routes/RegistrationPage/RegistrationPage';
//import PunishPage from '../../routes/PunishPage/PunishPage';
//import LoginPage from '../../routes/LoginPage/LoginPage';
import PunishmentPage from '../../routes/PunishmentPage/PunishmentPage';
import { Route } from 'react-router-dom';
//import PunishmentListPage from '../../routes/PunishmentListPage/PunishmentListPage';
//import UserListPage from '../../routes/UserListPage/UserListPage';

function App() {
  return (
    <main className="App">
      <Route exact path='/punishment/:punishmentId' component={PunishmentPage} />
    </main>
  );
}

export default App;
