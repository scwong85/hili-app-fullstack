import api from './api';

export const getTokenUser = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    var token_data = JSON.parse(jsonPayload);
    return token_data;
};

export const getUser = () => {
    return api.get('/auth/users/');
  }
  