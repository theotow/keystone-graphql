import React, { Component } from 'react';
import styles from './_Header.scss';


class Header extends Component {

  render() {

    const {
      props: {
        loggedIn,
        loginHandler,
        logoutHandler,
        submitHandler,
        baseHandler
      },
    } = this;

    return (
      <header className={styles.header}>
          <div className={styles['header__wrap']}>
            <h1 className={styles['header__headline']} onClick={baseHandler}>Page</h1>
              <div className={styles['header__auth']} onClick={submitHandler}>SUBMIT</div>
              {(loggedIn)
                ? <div ref='button' className={styles['header__auth']} onClick={logoutHandler}>LOGOUT</div>
                : <div ref='button' className={styles['header__auth']} onClick={loginHandler}>LOGIN</div>
              }
          </div>
      </header>
    );
  }
}

Header.defaultProps = {
  loggedIn: true,
  loginHandler: () => {
    console.log('login');
  },
  logoutHandler: () => {
    console.log('logout');
  },
  submitHandler: () => {
    console.log('submit');
  },
  baseHandler: () => {
    console.log('base');
  }
};

Header.propTypes = {
  loggedIn: React.PropTypes.bool,
  loginHandler: React.PropTypes.func,
  logoutHandler: React.PropTypes.func,
  submitHandler: React.PropTypes.func,
  baseHandler: React.PropTypes.func
};

export default Header;
