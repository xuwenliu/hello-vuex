const api = {
    phone: {
        brand: '/phone/brand', //手机品牌下拉
        type: '/phone/type', //手机型号下拉
        list:'/phone/list', //手机列表
        add: '/phone/add', 
        delete: '/phone/delete', // _id
        info: '/phone/info', //修改信息 _id
        update: '/phone/update', //修改提交 _id ...
        
    },
    user: {
        register: '/user/register',
        login: '/user/login',
    }
}
export default api;