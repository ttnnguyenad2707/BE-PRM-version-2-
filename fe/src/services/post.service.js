import axios from 'axios';
import { URL_SERVER } from '../dataConfig';
import Cookies from 'js-cookie';


export const getPostedStore = async (type,token1) => {

    
    if(type === 'posted'){
        return await axios.get(`${URL_SERVER}/post/getPosted`,{ 
            withCredentials: true,
    
            headers: {
                token: `Bearer ${token1}`,
            }
        })
    }

    else if(type === 'deleted'){
        return await axios.get(`${URL_SERVER}/post/getdeletedpost`,{  

            headers: {
                token: `Bearer ${token1}`,
            }
        })

    }
}
export const createPost = async (data,token) => {
    console.log(data, "created");
    return await axios.post(`${URL_SERVER}/post/`,data,{
        withCredentials: true,
        
        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const getPostedById = async (id) => {
const token = Cookies.get('accessToken');

    return await axios.get(`${URL_SERVER}/post/${id}`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const deletePost = async (id) => {
    const token = Cookies.get('accessToken');
    return await axios.delete(`${URL_SERVER}/post/${id}`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const editPost = async (id) => {
const token = Cookies.get('accessToken');

    return await axios.put(`${URL_SERVER}/post/${id}`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const restorePost = async (id) => {
const token = Cookies.get('accessToken');

    return await axios.post(`${URL_SERVER}/post/${id}`,null,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const destroyPost = async (id) => {
const token = Cookies.get('accessToken');

    return await axios.delete(`${URL_SERVER}/post/destroy/${id}`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const getDetailPost = async (slug) => {
    
    return await axios.get(`${URL_SERVER}/post/${slug}`)
}

export const getPosterInfo = async (id) => {
    return await axios.get(`${URL_SERVER}/user/${id}`)
}

// export const getAllPost = async () => {
//     return await axios.get(`${URL_SERVER}/post/`)
// }

export const getPostedByOwner = async (id) => {
    return await axios.get(`${URL_SERVER}/post/getpostedbyowner/${id}`)
}
export const searchPost = async (title,currentPage) => {
const token = Cookies.get('accessToken');

    return await axios.get(`${URL_SERVER}/post/search/${title}/${currentPage}`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const getAllPost = async (currentPage) => {
const token = Cookies.get('accessToken');

    return await axios.get(`${URL_SERVER}/post/getAll/${currentPage}`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        }
    })
}

export const getPostfilter = async (address,area,price,utils,currentPage) => {
const token = Cookies.get('accessToken');
console.log(address,area,price,utils,currentPage,'day la services');

    return await axios.post(`${URL_SERVER}/post/search/filter`,{ 
        withCredentials: true,

        headers: {
            token: `Bearer ${token}`,
        },
        body: {
            address: address,
            area: area,
            price: price,
            utils:utils,
            currentPage: currentPage,
        }
    })
}