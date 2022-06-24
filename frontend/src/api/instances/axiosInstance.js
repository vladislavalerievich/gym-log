import axios from 'axios'
import {apiRoutes} from "../../utils/routes";
import {isTokenValid} from "../../utils/helpers";
import store from "../../redux/store";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === process.env.REACT_APP_API_UR + apiRoutes.refresh) {
            store.dispatch({type: "CLEAR_SESSION"});
        }

        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken && isTokenValid(refreshToken)) {
                return axiosInstance
                    .post(apiRoutes.refresh, {refresh: refreshToken})
                    .then((response) => {
                        localStorage.setItem('accessToken', response.data.access);
                        localStorage.setItem('refreshToken', response.data.refresh);

                        axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                        originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        console.error(err)
                    });
            } else {
                store.dispatch({type: "CLEAR_SESSION"});
            }

        } else {
            store.dispatch({type: "CLEAR_SESSION"});
        }
    }
);

export default axiosInstance;