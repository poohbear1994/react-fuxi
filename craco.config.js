/* eslint-disable */
module.exports = {
	webpack: {
		// 这里可以获得项目的webpack的配置，可以在这对webpack的配置进行修改
		configure(webpackConfig) {
			if (webpackConfig.mode === 'production') {
				// 抽离公共代码，只在生产环境
				if (webpackConfig.optimization == null) {
					webpackConfig.optimization = {}
				}
				webpackConfig.optimization.splitChunks = {
					chunks: 'all',
					cacheGroups: {
						antd: {
							name: 'antd-chunk',
							// 所有import ... from 'antd/*'的都使用该规则
							test: /antd/,
							// 优先级
							priority: 100,
						},
						reactDom: {
							name: 'reactDom-chunk',
							test: /react-dom/,
							priority: 99
						},
						// 第三方包
						vendors: {
							name: 'vendors-chunk',
							test: /node_modules/,
							priority: 98
						}
					}
				}
			}
			return webpackConfig
		}
	},
	devServer: {
		port: 8000,
		proxy: {
			'/api': 'http://localhost:3001',
		},
	},
}
