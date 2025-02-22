import axiosBase from 'axios';

console.log(process.env);

const axios = axiosBase.create({
  baseURL: process.env.API_GATEWAY_URL,
});

export default axios;
