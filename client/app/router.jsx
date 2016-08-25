import {Route, NotFoundRoute, Link, Router} from 'react-router';
import React, { Component, PropTypes } from 'react';
import history from './history';

import AuthPage from './pages/Auth/Auth';
import ListPage from './pages/List/List';
import NotFoundPage from './pages/NotFound/NotFound';
import SubmitPage from './pages/Submit/Submit';


export default class MyRouter extends Component {
  render() {
    return (
          <Router history={history}>
            <Route path="/" component={ListPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/submit" component={SubmitPage} />
            <Route path="*" component={NotFoundPage}/>
          </Router>
    );
  }
}
