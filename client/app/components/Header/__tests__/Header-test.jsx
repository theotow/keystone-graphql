'use strict';

import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import Header from '../Header.jsx';

describe('Header Logout', () => {

  let header = TestUtils.renderIntoDocument(
    <Header loggedIn={true} />
  );
  let headerElem = ReactDOM.findDOMNode(header);
  let button = ReactDOM.findDOMNode(header.refs.button);

  it('Should render one link login or logout', () => {
    expect(button.tagName).to.equal('DIV');
  });

  it('Should be logout', () => {
    expect(button.innerHTML).to.equal('LOGOUT');
  })
});

describe('Header Login', () => {

  let header = TestUtils.renderIntoDocument(
    <Header loggedIn={false} />
  );
  let headerElem = ReactDOM.findDOMNode(header);
  let button = ReactDOM.findDOMNode(header.refs.button);

  it('Should render one link login or logout', () => {
    expect(button.tagName).to.equal('DIV');
  });

  it('Should be login', () => {
    expect(button.innerHTML).to.equal('LOGIN');
  })
});
