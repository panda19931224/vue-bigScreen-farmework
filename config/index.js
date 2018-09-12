'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
module.exports = {
  dev: {
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/GDiBigScreen/',
    proxyTable: {},
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8089, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: false,
    useLocalSidebar: true // 是否使用本地菜单，如果设为false，则使用poc配置的菜单
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/GDiBigScreen/',
    offlineApiUrl: 'http://221.226.175.82:9918/screenLocatioinApi',
    onlineApiUrl: 'http://221.226.175.82:9918/screenLocatioinApi',
    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
