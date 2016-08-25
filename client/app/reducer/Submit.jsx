import mirror from '../util/mirror';

const initialState = {
  submitload: false,
  submiterror: false
}

export const SubmitConst = mirror([
  'SUBMIT_LOADING',
  'SUBMIT_SUCCESS',
  'SUBMIT_ERROR'
])

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case SubmitConst.SUBMIT_LOADING:
      return {
        ...initialState,
        submitload: true
      };
    case SubmitConst.SUBMIT_SUCCESS:
      return initialState;
    case SubmitConst.SUBMIT_ERROR:
      return {
        submitload: false,
        submiterror: true
      };
    default:
      return state;
  }
};
