import {
    USER_REGISTER,
    USER_LOGIN,
    RESET_USER,
    USER_LOGOUT
} from "@/vuex/mutation-types";

import axios from "@/axios/axios";
import api from "@/axios/api";

const user = {
    namespaced: true,
    state: {
        userNameError: "",
        passwordError: "",
        loading: false,
        form: {
            userName: "",
            password: ""
        }
    },
    mutations: {
        [RESET_USER](state) {
            state.form = {
                userName: "",
                password: ""
            };
        }
    },
    actions: {
        //注册
        async [USER_REGISTER](ctx, data) {
            let result = await axios.post(api.user.register, data);
            return result;
        },

        //登录
        async [USER_LOGIN](ctx, data) {
            let result = await axios.post(api.user.login, data);
            return result;
        },

        //退出
        async [USER_LOGOUT]() {
            let result = await axios.post(api.user.logout);
            return result;
        }
    }
};

export default user;
