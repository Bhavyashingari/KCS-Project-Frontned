import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from "./authService";
import { DEV_API_URL } from "../_utils_/stringConstants";
import { create } from "@mui/material/styles/createTransitions";

const API_URL=DEV_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
  });
  
  // Add the Authorization header for every request
  axiosInstance.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to the headers
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


const createNewRoom= async(roomDetails)=>{
    try{
        const response= await axiosInstance.post('rooms/create/', roomDetails);
        return response.data; 
    }catch(error){
        throw error.response.data;
    }
}

export default {
    createNewRoom
};