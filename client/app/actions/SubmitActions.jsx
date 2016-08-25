import { SubmitConst } from '../reducer/Submit';
import * as utils from '../util/api';
import * as RouteActions from './RouteActions';

export function submitTopic(submitData) {
  return (dispatch, getState) => {
    dispatch({
      type: SubmitConst.SUBMIT_LOADING
    });
    utils.submit(submitData).then((data) => {
      RouteActions.go('/');
      dispatch({
        type: SubmitConst.SUBMIT_SUCCESS
      });
    }).catch(() => {
      dispatch({
        type: SubmitConst.SUBMIT_ERROR
      });
    })
  };
}
