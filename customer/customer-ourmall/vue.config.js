const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
  return path.join(__dirname, dir)
}
process.env.VERSION = `${new Date().getTime()}`;
process.env.OUTPUTDIR = './../ourmall';
const diyPlugin = require('./src/build/diy-plugin');
module.exports = {
	productionSourceMap: true,
  publicPath: process.env.VUE_APP_BASEURL,
  lintOnSave: false,
  outputDir: './../ourmall',
	css: {
	  loaderOptions: {
		sass: {
		  prependData: `@import "~@/element-variables.scss";`
		}
	  }
	},
	chainWebpack: config => {
		// 移除 prefetch
    config.plugins.delete('prefetch');
		config.plugins.delete('preload');
  },
	configureWebpack: config => {
	  if (process.env.NODE_ENV === 'production') {	
			config.plugins.push(
				new diyPlugin({ path: './ourmall', env: process.env, versionDirectory: 'static' }),
			)
			config.plugins.push(new webpack.DefinePlugin({ 'process.env': process.env }))
	  }

		config['externals'] = {
			'vue': 'Vue',
			'echarts': 'echarts',
			'moment': 'moment',
			'element-ui': 'ELEMENT'
		}
	config.plugins.push( 
	  new ProgressBarPlugin({
		format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
		  clear: false
		})
	)
	// 打包gzip
	config.plugins.push(
		new CompressionWebpackPlugin({
	        algorithm: 'gzip',
	        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
	        threshold: 10240,
	        minRatio: 0.8
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
	// 	host: 'sandboxwww.ourmall.com',
	// 	port: 80,
	// 	https: true,
  // },
}