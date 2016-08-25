import { TopicConst } from '../reducer/Topics';
import * as utils from '../util/api';
import { isLiked, getLikeId } from '../util/topic';
import { isLoggedIn } from '../util/auth';

export function getList() {
  return (dispatch, getState) => {
    dispatch({
      type: TopicConst.GETLIST_LOADING
    });
    utils.list().then((data) => {
      dispatch({
        type: TopicConst.GETLIST_SUCCESS,
        payload: data
      });
    }).catch((err) => {
      console.log(err)
      dispatch({
        type: TopicConst.GETLIST_ERROR
      });
    })
  }
}

export function toggleLikeTopic(topic, auth){
  return (dispatch, getState) => {
    if(!isLoggedIn(auth)) return;
    if(isLiked(topic, auth.id)){
      utils.unlike({
        token: auth.authkey,
        likedId: getLikeId(topic, auth.id),
        topicId: topic.id
      }).then(() => {
        dispatch(getList());
      });
    }else{
      utils.like({
        token: auth.authkey,
        userId: auth.id,
        topicId: topic.id
      }).then(() => {
        dispatch(getList());
      });
    }
  }
}

export function toggleTopic(topic) {
  if(topic.open){
    return {
      type: TopicConst.TOPIC_CLOSE,
      payload: topic.id
    };
  }else{
    return {
      type: TopicConst.TOPIC_OPEN,
      payload: topic.id
    };
  }
}
