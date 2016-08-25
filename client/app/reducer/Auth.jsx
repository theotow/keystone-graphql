import mirror from '../util/mirror';

const initialState = {
  id: null,
  authkey: null,
  username: null,
  loginload: false,
  signupload: false,
  loginerror: false,
  signuperror: false
}

export const AuthConst = mirror([
  'LOGIN_LOADING',
  'LOGIN_SUCCESS',
  'LOGIN_ERROR',
  'LOGOUT',
  'SIGNUP_LOADING',
  'SIGNUP_SUCCESS',
  'SIGNUP_ERROR',
])

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case AuthConst.LOGIN_LOADING:
      return {
        ...state,
        loginload: true
      };
    case AuthConst.LOGIN_SUCCESS:
      return {
        ...state,
        loginload: false,
        id: action.payload.id,
        authkey: action.payload.authkey
      };
    case AuthConst.LOGIN_ERROR:
      return {
        ...state,
        loginload: false,
        loginerror: true
      };
    case AuthConst.SIGNUP_LOADING:
      return {
        ...state,
        signupload: true,
      };
    case AuthConst.SIGNUP_SUCCESS:
      return {
        ...state,
        signupload: false,
        id: action.payload.id,
        authkey: action.payload.authkey,
        username: action.payload.username
      };
    case AuthConst.SIGNUP_ERROR:
      return {
        ...state,
        signupload: false,
        signuperror: true
      };
    case AuthConst.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
