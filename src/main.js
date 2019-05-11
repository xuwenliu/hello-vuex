import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';



import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';

Vue.use(MuseUI);
Vue.use(Message);

Vue.use(Toast, {
    position: 'bottom',
});

Vue.config.productionTip = false;


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')