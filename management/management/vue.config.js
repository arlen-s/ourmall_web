const webpack = require('webpack')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
function resolve(dir) {
  return path.join(__dirname, dir)
}
process.env.VERSION = `${new Date().getTime()}`;
process.env.OUTPUTDIR = './../dist'
const diyPlugin = require('./src/build/diy-plugin');
module.exports = {
  lintOnSave: false,
  outputDir: './../dist',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/element-variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new diyPlugin({ path: './dist', env: process.env, versionDirectory: 'static' }),
      )
      config.plugins.push(new webpack.DefinePlugin({ 'process.env': process.env }))
    }

    // 打包时间查看
    config.plugins.push(
      new ProgressBarPlugin({
        format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
    )

    config.resolve = {
      extensions: ['.js', '.vue', '.json', ".css"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },
  // devServer: {
  // 	disableHostCheck: true,
  // 	host: 'vendor.ourmall.com',
  // 	port: 80,
  // 	https: true,
  // },
}