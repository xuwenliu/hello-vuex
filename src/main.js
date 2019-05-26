import Vue from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import router from "./router";
import MuseUI from "muse-ui";
import Toast from "muse-ui-toast";
import Message from "muse-ui-message";
import Loading from "muse-ui-loading";

import theme from "muse-ui/lib/theme";
theme.add(
    "pink",
    {
        primary: "#e5017d",
        secondary: "#ff4081",
        success: "#4caf50",
        warning: "#ffeb3b",
        info: "#e5017d",
        error: "#f44336",
        track: "#bdbdbd",
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "gba(0, 0, 0, 0.54)",
            alternate: "#fff",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)" // 提示文字颜色
        },
        divider: "rgba(0, 0, 0, 0.12)",
        background: {
            paper: "#fff",
            chip: "#e0e0e0",
            default: "#fafafa"
        }
    },
    "light"
);

let themeBool = localStorage.getItem("themeBool") == 1;
if (themeBool) {
    theme.use("dark");
} else {
    theme.use("pink");
}

import "muse-ui/dist/muse-ui.css";
import "muse-ui-message/dist/muse-ui-message.css";
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css

Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Loading, {
    size: 24,
    overlayColor: "rgba(200,200,200,0.8)"
});

Vue.use(Toast, {
    position: "bottom"
});

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");
