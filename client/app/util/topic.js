import _ from 'lodash';
import { createFragment } from 'apollo-client';
import gql from 'graphql-tag';

export function isLiked(likes, userId){
  return (_.findWhere(likes, {author: userId}) !== undefined) ? true : false;
}

export function getLikeId(topic, userId){
  var res = _.find(topic.likes, (like) => {
    return (like.userId === userId);
  });
  return (res === undefined) ? undefined : res.id;
}

export const fragment = createFragment(gql`
  fragment postFragment on Post{
    title,
    text,
    author,
    likes{
      author
    },
    createdAt,
    _id
  }
`);
