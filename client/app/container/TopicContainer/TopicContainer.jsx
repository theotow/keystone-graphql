import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Loader from '../../components/Loader/Loader';
import Topic from '../../components/Topic/Topic';
import * as TopicsActions from '../../actions/TopicsActions';
import * as RouteActions from '../../actions/RouteActions';
import { isLoggedIn } from '../../util/auth';
import { isLiked, fragment } from '../../util/topic';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import classNames from 'classnames';
import styles from '../../scss/app.scss';
import stylesPriv from './_TopicContainer.scss';

const GET_POSTS = gql`
  query getPosts {
    posts{
      ...postFragment
    }
  }
`;

const LIKE_POST = gql`
  mutation likePost($postId: String!, $userToken: String!) {
    likePost(postId: $postId, userToken: $userToken) {
      ...postFragment
    }
  }
`;

const UNLIKE_POST = gql`
  mutation unlikePost($postId: String!, $userToken: String!) {
    unlikePost(postId: $postId, userToken: $userToken) {
      ...postFragment
    }
  }
`;

@connect(
  state => ({ auth: state.auth }),
  dispatch => bindActionCreators(TopicsActions, dispatch)
)
@graphql(LIKE_POST, {
  name: 'likePost',
  options: {
    fragments: fragment,
  },
})
@graphql(UNLIKE_POST, {
  name: 'unlikePost',
  options: {
    fragments: fragment,
  },
})
@graphql(GET_POSTS, {
  options: {
    fragments: fragment,
  },
  props: ({ ownProps, data }) => {
    if (data.loading) return { loading: true };
    if (data.error) return { hasErrors: true };
    return {
      posts: data.posts
    };
  }
})
class TopicContainer extends Component {

  like(data){
    this.props.likePost({
      variables: {
        postId: data._id,
        userToken: this.props.auth.authkey
      }
    })
  }

  unlike(data){
    this.props.unlikePost({
      variables: {
        postId: data._id,
        userToken: this.props.auth.authkey
      }
    })
  }

  renderLoader(){
    return <div className={styles['center']}><Loader /></div>;
  }

  renderError(){
    return <div className={styles['center']}>Error loading Topics</div>;
  }

  postNow(){
    RouteActions.goOr(isLoggedIn(this.props.auth), '/submit', '/auth');
  }

  renderEmpty(){
    return (
      <div className={classNames(styles['h2'], styles['center'])}>
          List is empty
          <div className={styles['center']}>
            <button className={stylesPriv['topic-list__btn']} onClick={::this.postNow}>POST NOW</button>
          </div>
      </div>
    )
  }

  isOwned(id){
    return (this.props.auth.id === id);
  }

  renderList(){
    let that = this;
    return _.map(this.props.posts, (topic, key) => {
      let hasLike = isLiked(topic.likes, this.props.auth.id);
      let likeUnlike = (!hasLike) ? this.like.bind(this) : this.unlike.bind(this);
      return (
        <Topic key={key}
        titleHandler={() => {}}
        likeHandler={() => likeUnlike(topic)}
        num={key + 1}
        liked={hasLike}
        owned={this.isOwned(topic.author)}
        title={topic.title}
        text={topic.text}
        points={topic.likes.length * 10}
        time={topic.createdAt}
        author={topic.author} />
      )
    });
  }

  render() {
    return (
      <div>
        {(this.props.loading) && this.renderLoader()}
        {(this.props.hasError) && this.renderError()}
        {(this.props.posts.length === 0 && !this.props.hasError && !this.props.loading) && this.renderEmpty()}
        {this.renderList()}
      </div>
    );
  }
}

TopicContainer.defaultProps = {
  posts: []
}

TopicContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  posts: PropTypes.array,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
}

export default TopicContainer
