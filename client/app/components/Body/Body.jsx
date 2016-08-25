import React, { Component } from 'react';
import styles from './_Body.scss';


class Body extends Component {

  render() {
    return (
      <div className={styles.body}>
          <div className={styles['body__wrap']}>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default Body;
