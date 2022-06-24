import axiosInstance from "./instances/axiosInstance";
import {apiRoutes} from "../utils/routes";

export const getExercises = () => axiosInstance.get(apiRoutes.exercise).then(response => response.data);
export const getBodyParts = () => axiosInstance.get(apiRoutes.bodyParts).then(response => response.data);
export const getEquipment = () => axiosInstance.get(apiRoutes.equipment).then(response => response.data);
export const createExercise = (data) => axiosInstance.post(apiRoutes.exercise, data).then(response => response.data);