import axios from "axios";
import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { event } from "../event";

const api_call = axios.create({
  baseURL: api,
});

api_call.interceptors.request.use(
  async (config) => {
    await AsyncStorage.getItem("token").then((token) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api_call.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      await AsyncStorage.getItem("refreshToken").then(async (token) => {
        await axios
          .get(`${api}/restaurant-manager/refresh`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            AsyncStorage.setItem("token", res.data.token);
            originalRequest.retry = true;
            originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
            console.log("refreshed");
          })
          .catch(async (err) => {
            console.log("refresh token expired");
            console.log("-->", err);
            await AsyncStorage.clear();
            event.emit("renderAgain");
            return Promise.reject({ err });
          });
      });

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api_call;
