var ps = require('process');
module.exports = {
	publicPath: "/",
	devServer: {
		port: 8080,
		proxy: {
			"/api": {
				target: "http://192.168.11.33:9002",
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