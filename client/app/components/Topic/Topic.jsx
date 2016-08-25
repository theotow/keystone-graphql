import React, { Component } from 'react';
import styles from './_Topic.scss';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';


class Topic extends Component {

  render() {
    const {
      props: {
        num,
        title,
        author,
        time,
        liked,
        points,
        owned,
        open,
        text,
        likeHandler,
        titleHandler
      },
      _timeTransfrom
    } = this;

    return (
      <div className={classNames({
          [styles.topic]: true,
          [styles['topic--owned']]: owned
        })}>
          <div className={styles['topic__wrap']}>
            <div className={styles['topic__top']}>
              <div className={styles['topic__num']}>{num}.</div>
              <div className={styles['topic__title']} onClick={titleHandler}>{title}</div>
            </div>
            <div className={classNames({
                [styles['topic__text']]: true,
                [styles['topic__text--open']]: open
              })}>
              <div className={styles['topic__text-inner']}>{text}</div>
            </div>
            <div className={styles['topic__bottom']}>
                <div className={classNames({
                    [styles['topic__heart']]: true,
                    [styles['topic__heart--active']]: liked
                  })} onClick={likeHandler}></div>
                <div className={styles['topic__points']}><strong>{points}</strong> points</div>
                <div className={styles['topic__timefrom']}><TimeAgo date={new Date(time)} /> / {author}</div>
            </div>
          </div>
      </div>
    );
  }
}

Topic.defaultProps = {
  num: 10,
  title: 'unknown',
  author: 'unknown',
  time: 99999,
  points: 0,
  liked: false,
  likeHandler: () => {
    console.log('handle like');
  },
  titleHandler: () => {
    console.log('handle title');
  },
  text: 'unknown',
  open: true,
  owned: false
};

Topic.propTypes = {
  num: React.PropTypes.number,
  title: React.PropTypes.string,
  author: React.PropTypes.string,
  time: React.PropTypes.number,
  points: React.PropTypes.number,
  liked: React.PropTypes.bool,
  owned: React.PropTypes.bool,
  open: React.PropTypes.bool,
  text: React.PropTypes.string,
  likeHandler: React.PropTypes.func,
  titleHandler: React.PropTypes.func
};

export default Topic;
