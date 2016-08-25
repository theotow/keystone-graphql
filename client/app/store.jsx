import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import * as Auth from './reducer/Auth';
import * as Submit from './reducer/Submit';
import * as Topics from './reducer/Topics';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';

let logger = createLogger();

export const Client = new ApolloClient({
  networkInterface: createNetworkInterface('/graphql', {
    credentials: 'same-origin',
  }),
  shouldBatch: true,
  dataIdFromObject: (result) => {
    if (result._id) { // eslint-disable-line no-underscore-dangle
      return result._id +''; // eslint-disable-line no-underscore-dangle
    }
    return null;
  }
});

const reducer = combineReducers({
  topics: Topics.Reducer,
  apollo: Client.reducer(),
  auth: Auth.Reducer,
  submit: Submit.Reducer
});

export const Store = compose(
  persistState('auth'),
  applyMiddleware(thunkMiddleware, logger, Client.middleware()),
)(createStore)(reducer);
