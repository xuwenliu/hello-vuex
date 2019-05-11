import Vue from 'vue'
import Vuex from 'vuex'
import phone from './modules/phone';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        phone,
        user,
    }
})