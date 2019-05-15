import axios from 'axios';
import Vue from 'vue';
import router from '../router';
const vue = new Vue({
    router
});


axios.interceptors.request.use(config => {
    config.baseURL = "/api"; //配合proxy代理使用
    config.timeout = 60 * 1000; // Timeout
    let TOKEN = localStorage.getItem("token");
    if (TOKEN) {
		config.headers.common['Authorization'] = "token=" + TOKEN; //设置请求token
    }
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    let code = response.data.code;
    if (code === 401) { //未授权
        localStorage.removeItem('token');
        vue.$router.push({
            name: 'user'
        });
        vue.$toast.error(response.data.msg)
    }
    return response;
}, error => {
    console.error(error)
    return Promise.resolve(error.response)
    });

export default axios;


