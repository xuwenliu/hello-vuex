# hello-vuex

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### 跨域问题 前端解决：proxy代理
1.在项目根目录下创建vue.config.js
```js
module.exports = {
    publicPath: "/",
    devServer: {
        port: 8080, //本地项目端口
        proxy: {
            "/api": { //这个要配合axios拦截器使用
                target: "http://localhost:9002", //代理地址，这里就是后台地址
                ws: false,
                changeOrigin: true //是否跨域
            }
        },
        disableHostCheck: true
    },
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
};

```
2.在src目录下新建axios/axios.js
```js
import axios from 'axios';

axios.interceptors.request.use(config => {
    config.baseURL = "/api"; //配合proxy代理使用 至关重要
    config.timeout = 60 * 1000; // Timeout
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error)
    return Promise.resolve(error.response)
    });

export default axios;

```
### 跨域问题 后台解决：koa2-cors
```js
    1.安装 yarn add koa2-cors
    2.引入 
    const Koa = require('koa');
    const app = new Koa();
    const cors = require('koa2-cors');
    3.使用
    app.use(cors());
    4.参考：https://www.npmjs.com/package/koa2-cors
```
