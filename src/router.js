import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "index"
            }
        },
        {
            path: "/main",
            name: "main",
            component: () =>
                import(/* webpackChunkName: "main" */ "@/views/Main.vue"),
            children: [
                {
                    path: "index",
                    name: "index",
                    component: () =>
                        import(
                            /* webpackChunkName: "index" */ "@/views/Index.vue"
                        )
                },
                {
                    path: "phone",
                    name: "phone",
                    component: () =>
                        import(
                            /* webpackChunkName: "phone" */ "@/views/Phone.vue"
                        )
                },
                {
                    path: "phone/list",
                    name: "phoneList",
                    component: () =>
                        import(
                            /* webpackChunkName: "phone" */ "@/views/PhoneList.vue"
                        )
                }
            ]
        },

        {
            path: "/user",
            name: "user",
            component: () =>
                import(/* webpackChunkName: "user" */ "@/views/User.vue")
        }
    ]
});
