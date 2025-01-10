import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { DEV_API_URL } from "../_utils_/stringConstants";

const API_URL=DEV_API_URL;

const getUsersList=async()=>{
    try{
        const response=await axios.get(`${API_URL}users/list`);
        return response.data;
    }
    catch(error){
        throw error.response.data;
    }
};


export default {
    getUsersList
};