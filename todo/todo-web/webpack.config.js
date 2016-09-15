var path = require('path');
var webpack = require('webpack');

var JS_DIR = path.resolve(__dirname, 'src/main/resources/META-INF/resources/js');

var PUBLIC_DIR = '/o/todo-app-webpack-1.0.0/js/dist/'; // Location of build file

module.exports = {
	devServer: { // Hot reloading dev-server
		hot: true,
		port: 3000, // Port that runs our dev-server
		proxy: {
			'**': 'http://0.0.0.0:8080' //Proxy to our portal instance
		},
		publicPath: PUBLIC_DIR // Location of static resources
	},
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000', // react-hot-loader
		'webpack/hot/only-dev-server',
		path.resolve(JS_DIR, 'src/entry.js')
	],
	module: {
		loaders: [
			{ // react-hot-loader
				include: path.resolve(JS_DIR, 'src'),
				loader: 'react-hot'
			},
			{
				include: path.resolve(JS_DIR, 'src'),
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(JS_DIR, 'dist'),
		publicPath: PUBLIC_DIR // Location of static resources
	},
	plugins: [ // Hot reloading
		new webpack.HotModuleReplacementPlugin()
	]
};