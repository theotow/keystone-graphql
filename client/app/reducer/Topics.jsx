import mirror from '../util/mirror';
import _ from 'lodash';

const initialState = {
  error: false,
  loading: false,
  topics: []
}

export const TopicConst = mirror([
  'GETLIST_LOADING',
  'GETLIST_SUCCESS',
  'GETLIST_ERROR',
  'TOPIC_OPEN',
  'TOPIC_CLOSE'
])


function mapper(state){
  return {
    id: state.id,
    points: state.likes.length * 10,
    title: state.title,
    time: state.createDate,
    open: false,
    text: state.content,
    likes: state.likes,
    author: (state.user) ? state.user.username : 'missing',
    userId: state.userId
  }
}

function openTopic(state, id){
  if(state.id === id){
    return {
      ...state,
      open: true
    }
  }else{
    return state;
  }
}

function closeTopic(state, id){
  if(state.id === id){
    return {
      ...state,
      open: false
    }
  }else{
    return state;
  }
}

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case TopicConst.GETLIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case TopicConst.GETLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        topics: action.payload.map((topic) => mapper(topic))
      };
    case TopicConst.GETLIST_ERROR:
      return {
        loading: false,
        error: true,
        topics: []
      };
    case TopicConst.TOPIC_OPEN:
      return {
        ...state,
        loading: false,
        error: false,
        topics: state.topics.map((topic) => openTopic(topic, action.payload))
      };
    case TopicConst.TOPIC_CLOSE:
      return {
        ...state,
        loading: false,
        error: false,
        topics: state.topics.map((topic) => closeTopic(topic, action.payload))
      };
    default:
      return state;
    }
};
