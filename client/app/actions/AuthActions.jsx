import { AuthConst } from '../reducer/Auth';
import * as utils from '../util/api';
import * as RouteActions from './RouteActions';

export function logout() {
  return {
    type: AuthConst.LOGOUT
  }
}

export function login(auth) {
  return (dispatch, getState) => {
    dispatch({
      type: AuthConst.LOGIN_LOADING
    });
    let userData;
    utils.firebaseInstance.auth()
    .signInWithEmailAndPassword(auth.username, auth.password).then(function(user){
      userData = user;
      return utils.firebaseInstance.auth().currentUser.getToken(true);
    }).then(function(id) {
      RouteActions.go('/submit');
      dispatch({
        type: AuthConst.LOGIN_SUCCESS,
        payload: {
          id: userData.uid,
          authkey: id
        }
      });
    }).catch(function(error) {
      dispatch({
        type: AuthConst.LOGIN_ERROR
      });
    });
  };
}

export function signup(auth) {
  return (dispatch, getState) => {
    dispatch({
      type: AuthConst.SIGNUP_LOADING
    });
    let userData;
    utils.firebaseInstance.auth()
    .createUserWithEmailAndPassword(auth.username, auth.password).then(function(user){
      userData = user;
      return utils.firebaseInstance.auth().currentUser.getToken(true);
    }).then(function(id) {
      RouteActions.go('/submit');
      dispatch({
        type: AuthConst.SIGNUP_SUCCESS,
        payload: {
          id: userData.uid,
          authkey: id,
          username: ''
        }
      });
    }).catch(function(error) {
      dispatch({
        type: AuthConst.SIGNUP_ERROR
      });
    });
  };
}
