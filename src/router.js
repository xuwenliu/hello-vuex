import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [{
            path: "/",
            redirect: {
                name: "phoneList"
            }
        },
        {
            path: '/phone',
            name: "phone",
            component: () =>
                import( /* webpackChunkName: "phone" */ "@/views/Phone.vue")
        },
        {
            path: '/phone/list',
            name: "phoneList",
            component: () =>
                import( /* webpackChunkName: "phone" */ "@/views/PhoneList.vue")
        }
    ]
})