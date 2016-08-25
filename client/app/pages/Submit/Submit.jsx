import React, { Component } from 'react';
import classNames from 'classnames';
import Body from '../../components/Body/Body';
import HeaderContainer from '../../container/HeaderContainer/HeaderContainer';
import SubmitContainer from '../../container/SubmitContainer/SubmitContainer';
import styles from '../../scss/app.scss';

export default class Submit extends Component {

  render() {
    return (
      <div className={styles.container}>
        <HeaderContainer />
        <Body>
          <div className={styles.clearfix}>
              <div className={classNames(styles['col'], styles['sm-col-12'], styles['lg-col-6'], styles['md-col-6'])}>
                <h2 className={styles['h2']}>Post Topic</h2>
                <SubmitContainer />
              </div>
          </div>
        </Body>
      </div>
    );
  }
}
