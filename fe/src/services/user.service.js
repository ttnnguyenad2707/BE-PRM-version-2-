import axios from 'axios';
import { URL_SERVER } from '../dataConfig';
export const updateUser = async (token,id,data) => {
    return await axios.put(`${URL_SERVER}/user/${id}`,data, {
        withCredentials: true,
        
        headers: {
            token: `Bearer ${token}`,
        }
    })
}