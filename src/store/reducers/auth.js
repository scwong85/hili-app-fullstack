import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
  token: null,
  refresh: null,
  error: null,
  loading: false,
  user_id: null,
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    refresh: action.refresh,
    error: null,
    loading: false,
    user_id: action.user_id,
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    refresh: null,
    user_id: null,
  });
}

const authRefreshSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    refresh: action.refresh,
    error: null,
    loading: false,
    user_id: action.user_id,
  });
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.REFRESH_TOKEN: return authRefreshSuccess(state, action);
    default:
      return state;
  }
}

export default reducer;