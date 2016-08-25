import React, { Component } from 'react';
import Body from '../../components/Body/Body';
import HeaderContainer from '../../container/HeaderContainer/HeaderContainer';
import styles from '../../scss/app.scss';

export default class NotFound extends Component {

  render() {
    return (
      <div className={styles.container}>
        <HeaderContainer />
        <Body>
            Not Found
        </Body>
      </div>
    );
  }
}
