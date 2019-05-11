import { USER_REGISTER,USER_LOGIN } from "@/vuex/mutation-types";

import axios from "@/axios/axios";
import api from "@/axios/api";

const user = {
    namespaced: true,
    state: {
        form: {
            userName: '',
            password: '',
        }
    },
    actions: {
        async [USER_REGISTER](ctx, data) {
            let result = await axios.post(api.user.register, data);
            return result;
        },
        
        async [USER_LOGIN](ctx, data) {
            let result = await axios.post(api.user.login, data);
            return result;
        }
    }
}


export default user;