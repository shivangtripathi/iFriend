import {CHANGE_VARIABLE} from '../actions/Type';

const INITIAL_STATE = {
  activity: undefined,
  user: {},
  authenticated: false,
  batchCode: '',
  subBatchCode: '',
  enrollNumber: '',
  loading: false,
};
const a = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_VARIABLE:
      return {...state, [action.payload.key]: action.payload.value};
    default:
      return state;
  }
};
export {a as default};
