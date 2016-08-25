import React, { Component } from 'react';
import Body from '../../components/Body/Body';
import HeaderContainer from '../../container/HeaderContainer/HeaderContainer';
import TopicContainer from '../../container/TopicContainer/TopicContainer';
import styles from '../../scss/app.scss';

export default class List extends Component {

  render() {
    return (
      <div className={styles.container}>
        <HeaderContainer />
        <Body>
            <TopicContainer />
        </Body>
      </div>
    );
  }
}
