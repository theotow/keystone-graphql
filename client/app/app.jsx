import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Store, Client } from './store.jsx';
import Router from './router.jsx';
import { ApolloProvider } from 'react-apollo';

class Root extends Component {
  render() {
    return (
      <ApolloProvider store={Store} client={Client}>
        <Router />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);
