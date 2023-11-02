import { URL_SERVER } from '../dataConfig';

export const host = "http://localhost:5000";
export const allUsersRoute = `${URL_SERVER}/conversation/allusers`;
export const allContactsRoute = `${URL_SERVER}/conversation/allcontacts`;
export const sendMessageRoute = `${URL_SERVER}/conversation/addmsg`;
export const recieveMessageRoute = `${URL_SERVER}/conversation/getmsg`;
