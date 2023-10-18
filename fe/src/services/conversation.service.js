import axios from 'axios';
import { URL_SERVER } from '../dataConfig';


export const createOne = async (data) => {
    return await axios.post(`${URL_SERVER}/conversation`, data)
}
export const getOne = async (user1,user2) => {
    return await axios.get(`${URL_SERVER}/conversation/${user1}/${user2}`)
}
export const updateOne = async (conversationId,data) => {
    return await axios.put(`${URL_SERVER}/conversation/${conversationId}/message`, data)
}