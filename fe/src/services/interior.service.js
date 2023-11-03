import axios from 'axios';
import { URL_SERVER } from '../dataConfig';
import Cookies from 'js-cookie';


export const getAllInterior = async () => {
    const token = Cookies.get('accessToken');

    return await axios.get(`${URL_SERVER}/interior/`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    })
}