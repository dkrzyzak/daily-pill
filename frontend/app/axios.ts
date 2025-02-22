import axiosBase from 'axios';

const axios = axiosBase.create({
    baseURL: process.env.API_GATEWAY_URL,
    withCredentials: true,
});

export default axios;
