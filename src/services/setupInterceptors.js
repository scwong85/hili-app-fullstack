import axiosInstance from "./api";
import TokenService from "./token.services";
import { refreshToken } from "../store/actions/auth";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('intercept request')
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        //config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      console.log('request error', error);
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/auth/login/" && err.response) {
        // Access Token was expired

        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axiosInstance.post("/auth/login/refresh/", {
              refresh: TokenService.getLocalRefreshToken(),
            });

            const token = rs.data.access;
            const refresh = TokenService.getLocalRefreshToken();
            const user_id = TokenService.getLocalUserId();

            dispatch(refreshToken(token, refresh, user_id));
            TokenService.updateLocalAccessToken(token);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;