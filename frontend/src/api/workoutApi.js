import axiosInstance from "./instances/axiosInstance";
import {apiRoutes} from "../utils/routes";

export const getWorkoutHistory = () => axiosInstance.get(apiRoutes.workout).then(response => response.data);
export const createWorkout = (data) => axiosInstance.post(apiRoutes.workout, data).then(response => response.data);
export const deleteWorkout = (id) => axiosInstance.delete(apiRoutes.workout + id + '/').then(response => response.data);
