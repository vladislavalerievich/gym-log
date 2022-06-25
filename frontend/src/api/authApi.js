import axiosInstance from "./instances/axiosInstance";
import {apiRoutes} from "../utils/routes";

export const login = (data) => axiosInstance.post(apiRoutes.login, data).then(response => response.data);
export const register = (data) => axiosInstance.post(apiRoutes.register, data).then(response => response.data);
export const blacklist = () => axiosInstance.post(apiRoutes.blacklist,
    {"refresh": localStorage.getItem('refreshToken')}).then(response => response.data);
