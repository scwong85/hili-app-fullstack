class TokenService {
    getLocalRefreshToken() {
      const refresh = window.localStorage.getItem("refresh");
      return refresh;
    }
  
    getLocalAccessToken() {
      const token = window.localStorage.getItem("token");
      return token;
    }

    getLocalUserId() {
      const user_id = window.localStorage.getItem("user_id");
      return user_id;
    }
  
    updateLocalAccessToken(token) {
      window.localStorage.setItem("token", token);
    }

  }
  
  export default new TokenService();