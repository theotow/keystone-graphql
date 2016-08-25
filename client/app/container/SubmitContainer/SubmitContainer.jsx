import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Form from '../../components/Form/Form';
import * as SubmitActions from '../../actions/SubmitActions';
import * as RouteActions from '../../actions/RouteActions';
import { isLoggedIn } from '../../util/auth';
import { SubmitConst } from '../../reducer/Submit';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_POST = gql`
  mutation createPost($text: String!, $title: String!, $userToken: String!) {
    createPost(text: $text, title: $title, userToken: $userToken) {
      title,
      text,
      author,
      createdAt,
      likes {
        author
      },
    	_id
    }
  }
`;

@connect(
  state => ({ auth: state.auth, submit: state.submit })
)
@graphql(CREATE_POST, {
  name: 'createPost'
})
class SubmitContainer extends Component {

  _submit(data){
    if(!isLoggedIn(this.props.auth)) return;
    this.props.dispatch({
      type: SubmitConst.SUBMIT_LOADING
    });
    this.props.createPost({
      variables: {
        title: data.title,
        text: data.content,
        userToken: this.props.auth.authkey
      },
      updateQueries: {
        getPosts: (previousQueryResult, { mutationResult, queryVariables }) => {
          return {
            posts: [...previousQueryResult.posts, mutationResult.data.createPost]
          }
        },
      }
    }).then(() => {
      RouteActions.go('/');
      this.props.dispatch({
        type: SubmitConst.SUBMIT_SUCCESS
      })
    }).catch((errro) => this.props.dispatch({
      type: SubmitConst.SUBMIT_ERROR
    }))
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Form
          mode={'topic'}
          loading={this.props.submit.submitload}
          error={this.props.submit.submiterror}
          btntxt={'CREATE'}
          submitTopic={(submitData) => this._submit(submitData)} />
      </div>
    );
  }
}

SubmitContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default SubmitContainer
