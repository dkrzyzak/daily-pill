import axiosBase from 'axios';

// TODO: make this variable accessible on the client or rewrite the api gateway connection to be server-only
const axios = axiosBase.create({
    baseURL: 'http://localhost:3000' || process.env.API_GATEWAY_URL,
    withCredentials: true,
});

export default axios;
