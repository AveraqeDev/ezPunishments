import React from 'react';
import ReactDOM from 'react-dom';

import {MemoryRouter} from 'react-router-dom';

import ResetPasswordPage from './ResetPasswordPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGavel // logo
 } from '@fortawesome/free-solid-svg-icons';

library.add(faGavel);

describe('ResetPasswordPage', () => {

  it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter><ResetPasswordPage/></MemoryRouter>, div);
  });
});