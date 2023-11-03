import axios from 'axios';
import { URL_SERVER } from '../dataConfig';
import Cookies from 'js-cookie';


export const getAllUtil = async () => {
    const token = Cookies.get('accessToken');

    return await axios.get(`${URL_SERVER}/util/`, {
        withCredentials: true,
        headers: {
            token: `Bearer ${token}`,
        }
    })
}