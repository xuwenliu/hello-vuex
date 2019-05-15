module.exports = {
    publicPath: "/",
    devServer: {
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:9002",
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