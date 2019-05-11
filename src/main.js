import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import theme from 'muse-ui/lib/theme';

theme.add('teal', {
  primary: '#009688',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b',
}, 'light');


let themeBool = localStorage.getItem('themeBool') == 1;
if (themeBool) {
    theme.use('teal');
} else {
    theme.use('light');
}



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