const path = require('path')

module.exports = {
	entry: {
		GameEngine: './engine/index.js',
		app: './game/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist'),
		
		publicPath: '/dist',
		library: 'GameEngine',
		libraryTarget: 'umd',
		globalObject: 'this'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}]
	},
	devServer: {
		overlay: true
	}
}