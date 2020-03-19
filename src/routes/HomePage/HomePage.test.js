import React from 'react';
import ReactDOM from 'react-dom';

import {MemoryRouter} from 'react-router-dom';

import HomePage from './HomePage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGavel // logo
 } from '@fortawesome/free-solid-svg-icons';

library.add(faGavel);

describe('HomePage', () => {

  it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter><HomePage/></MemoryRouter>, div);
  });
});