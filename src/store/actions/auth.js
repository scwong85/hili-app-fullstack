import * as actionTypes from './actionTypes';
import axios from 'axios';


export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const epochConvert = (seconds) => {
  let utcSeconds = parseInt(seconds);
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  return d;
}


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, refresh, user_id) => {
  return {
     type: actionTypes.AUTH_SUCCESS,
     token: token,
     refresh: refresh,
     user_id: user_id,
  }
}


export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
    token: null,
    refresh: null,
  }
}

// set time out after expiration time
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime*1000)
  }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(logout());
  }
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/auth/login/', {
      username: username,
      password: password
    })
      .then(res => {
        const token = res.data.access;
        const refresh = res.data.refresh;
        let token_data = parseJwt(refresh);
        let user_id = token_data['user_id']
        const expirationDate = epochConvert(token_data['exp']);
        //const expirationDate = new Date(new Date().getTime() + 3600*1000)
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('user_id', user_id);
        dispatch(authSuccess(token, refresh, user_id));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

export const authSignup = (username, email, password, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/auth/register/', {
      username: username,
      email: email,
      password: password,
      password2: password2,
      first_name: '',
      last_name: ''
    })
      .then(res => {
        const token = res.data.tokens.access;
        const refresh = res.data.tokens.refresh;
        let token_data = parseJwt(refresh);
        let user_id = token_data['user_id']
        const expirationDate = epochConvert(token_data['exp']);
        //const expirationDate = new Date(new Date().getTime() + 3600*1000)
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('user_id', user_id);
        dispatch(authSuccess(token, refresh, user_id));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

export const authCheckState = () => {

  return dispatch => {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');
    const user_id = localStorage.getItem('user_id');
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, refresh, user_id));
        let token_data = parseJwt(refresh);
        const expirationDate = epochConvert(token_data['exp']);
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000 ));
      }
    }
  }
}




export const refreshToken = (token, refresh, user_id) => {
  return dispatch => {
    dispatch(authSuccess(token, refresh, user_id));
  }
}