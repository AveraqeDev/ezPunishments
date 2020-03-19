import React from 'react';
import ReactDOM from 'react-dom';

import {MemoryRouter} from 'react-router-dom';

import ForgotPasswordPage from './ForgotPasswordPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGavel // logo
 } from '@fortawesome/free-solid-svg-icons';

library.add(faGavel);

describe('ForgotPasswordPage', () => {

  it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter><ForgotPasswordPage/></MemoryRouter>, div);
  });
});