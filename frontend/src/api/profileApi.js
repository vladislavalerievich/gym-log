import axiosInstance from "./instances/axiosInstance";
import {apiRoutes} from "../utils/routes";

export const getProfile = () => axiosInstance.get(apiRoutes.profile).then(response => response.data[0]);
export const updateProfile = (data) => axiosInstance.post(apiRoutes.profile, data).then(response => response.data);