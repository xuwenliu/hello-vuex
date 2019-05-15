import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import Loading from 'muse-ui-loading';


import theme from 'muse-ui/lib/theme';
let themeBool = localStorage.getItem('themeBool') == 1;
if (themeBool) {
    theme.use('dark');
} else {
    theme.use('light');
}



import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css


Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Loading, {
    size: 24,
    overlayColor: 'rgba(200,200,200,0.8)',
});


Vue.use(Toast, {
    position: 'bottom',
});

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')