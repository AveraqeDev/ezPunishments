import React from 'react';
import ReactDOM from 'react-dom';

import {MemoryRouter} from 'react-router-dom';

import UserPage from './UserPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGavel // logo
 } from '@fortawesome/free-solid-svg-icons';

library.add(faGavel);

describe('UserPage', () => {

  it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter><UserPage/></MemoryRouter>, div);
  });
});