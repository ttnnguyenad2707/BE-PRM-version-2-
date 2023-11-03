import axios from 'axios';
import { URL_SERVER } from '../dataConfig';
import Cookies from 'js-cookie';


export const getAllCategory = async () => {
    const token = Cookies.get('accessToken');

    return await axios.get(`${URL_SERVER}/category/`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    })
}