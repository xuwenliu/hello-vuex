'use strict'

import axios from 'axios';

axios.interceptors.request.use(config => {
    config.baseURL = "/api"; //配合proxy代理使用
    config.timeout = 60 * 1000; // Timeout
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error)
    return Promise.resolve(error.response)
    });

export default axios;


