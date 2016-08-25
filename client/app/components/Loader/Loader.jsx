import React, { Component } from 'react';
import styles from './_Loader.scss';

class Loader extends Component {

  render() {
    let color = {
      'border': '3px solid ' + this.props.color,
      'borderRightColor': 'transparent',
      'height': this.props.size + 'px',
      'width': this.props.size + 'px'
    };
    return (
      <div className={styles['three-quarters-loader']} style={color}></div>
    );
  }
}

Loader.defaultProps = {
  color: 'black',
  size: 32
};

Loader.propTypes = {
  color: React.PropTypes.string,
  size: React.PropTypes.number
};

export default Loader;
