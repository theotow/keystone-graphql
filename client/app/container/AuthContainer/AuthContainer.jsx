import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Form from '../../components/Form/Form';
import * as AuthActions from '../../actions/AuthActions';
import * as RouteActions from '../../actions/RouteActions';
import { isLoggedIn } from '../../util/auth';

@connect(
  state => ({ auth: state.auth }),
  dispatch => bindActionCreators(AuthActions, dispatch)
)
export default class AuthContainer extends Component {

  render() {
    const {
      mode,
      auth: {
        loginload,
        signupload,
        loginerror,
        signuperror
      },
      login,
      signup
    } = this.props;

    return (
      <div>
      {(mode === 'login')
        ? <Form
            mode={'auth'}
            loading={loginload}
            error={loginerror}
            btntxt={'LOGIN'}
            submitAuth={(auth) => login(auth)} />
        : <Form
            mode={'auth'}
            loading={signupload}
            error={signuperror}
            btntxt={'SIGN UP'}
            submitAuth={(auth) => signup(auth)} />
      }
      </div>
    );
  }
}

AuthContainer.defaultProps = {
  mode: 'login'
};

AuthContainer.propTypes = {
  mode: React.PropTypes.string
};
