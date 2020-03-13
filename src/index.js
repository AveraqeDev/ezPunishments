import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import App from './components/App/App';

import { 
  faGavel // logo
 } from '@fortawesome/free-solid-svg-icons';

library.add(
  faGavel
)

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>, 
  document.getElementById('root'));
