import {
    GET_PHONES,
    CHOOSE_BRAND,
    RESET_ADD_PHONE,
    ADD_PHONE,
    GET_PHONE_LIST,
    DELETE_PHONE,
    SET_TITLE,
    GET_PHONE_INFO,
    UPDATE_PHONE
} from "@/vuex/mutation-types";

import axios from "@/axios/axios";
import api from "@/axios/api";

const phone = {
    namespaced: true,
    state: {
        subTitle: "添加手机",
        form: {
            brandId: "", //选择的手机品牌id
            typeId: "", //选择的手机型号id
            status: 1 //1=在售,2=未售
        },
        phoneOptions: [], //手机品牌
        types: [], //手机型号
        list: [] //添加的手机列表
    },
    getters: {
        newList: state => {
            return state.list.map(item => {
                item.statusName = item.status === 1 ? "在售" : "未售";
                return item;
            });
        }
    },
    mutations: {
        //设置title
        [SET_TITLE](state, data) {
            state.subTitle = data;
        },

        //获取手机品牌
        [GET_PHONES](state, data) {
            state.phoneOptions = data;
        },

        //获取手机型号
        [CHOOSE_BRAND](state, data) {
            state.types = data;
        },

        //获取手机修改详情
        [GET_PHONE_INFO](state, data) {
            state.form = data;
        },

        //获取手机列表
        [GET_PHONE_LIST](state, data) {
            state.list = data;
        },

        //重置添加数据
        [RESET_ADD_PHONE](state) {
            state.form = {
                brandId: "",
                typeId: "",
                status: 1
            };
        }
    },
    actions: {
        //异步获取手机品牌数据
        async [GET_PHONES]({ commit }) {
            let result = await axios.get(api.phone.brand);
            if (result.data.success) {
                commit(GET_PHONES, result.data.data);
            }
        },

        //异步获取手机型号
        async [CHOOSE_BRAND]({ commit }, brandId) {
            let result = await axios.get(api.phone.type, {
                params: {
                    brandId
                }
            });
            if (result.data.success) {
                commit(CHOOSE_BRAND, result.data.data);
            }
        },

        //添加一个手机
        async [ADD_PHONE]({ commit }, data) {
            let result = await axios.post(api.phone.add, data);
            return result;
        },

        //获取手机列表
        async [GET_PHONE_LIST]({ commit },data) {
            let result = await axios.get(api.phone.list, {
                params:data
            });
            if (result.data.success) {
                commit(GET_PHONE_LIST, result.data.data);
            }
        },

        //删除
        async [DELETE_PHONE](ctx, data) {
            let result = await axios.delete(api.phone.delete, {
                params: data
            });
            return result;
        },

        //获取手机修改详情
        async [GET_PHONE_INFO]({ commit }, id) {
            let result = await axios.get(api.phone.info, {
                params: {
                    id
                }
            });
            //这里直接通过mutatiions给 state.form 赋值
            if (result.data.success) {
                commit(GET_PHONE_INFO, result.data.data);
            }
            //返回结果是为了 通过brandId获取手机型号列表
            return result;
        },

        //修改手机
        async [UPDATE_PHONE]({ commit }, data) {
            let result = await axios.put(api.phone.update, data);
            return result;
        }
    }
};

export default phone;
