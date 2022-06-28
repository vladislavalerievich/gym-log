import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {apiRoutes} from "../../utils/routes";
import store from "../../redux/store";

const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const axiosInstance = axios.create({
    baseURL: isDevEnv ? "http://localhost:8000/api" : "api",
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


const refreshAuth = failedRequest =>
    axiosInstance
        .post(apiRoutes.refresh, {"refresh": localStorage.getItem('refreshToken')})
        .then(response => {
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);

            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            failedRequest.response.config.headers['Authorization'] = 'JWT ' + response.data.access;
            return Promise.resolve();
        })
        .catch(error => {
            console.error("Could not refresh token", error);
            store.dispatch({type: "CLEAR_SESSION"});
            return Promise.reject(error);
        });


createAuthRefreshInterceptor(axiosInstance, refreshAuth);
export default axiosInstance;