import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { DEV_API_URL } from "../_utils_/stringConstants";

const API_URL = DEV_API_URL;

const getUsersList = async () => {
    try {
        const response = await axios.get(`${API_URL}users/list/`);
        return response.data;
    }
    catch (error) {
        throw error.response.data;
    }
};

const addUsersToRoom = async (addUserObject) => {
    try {
        const response = await axios.post(`${API_URL}rooms/add-users/`, addUserObject);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }else{
            throw error
        }
    }
}


export default {
    getUsersList,
    addUsersToRoom
};