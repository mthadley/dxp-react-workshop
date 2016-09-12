var path = require('path');
var webpack = require('webpack');

var DIST_DIR = '/o/todo-app-webpack-1.0.0/js/dist/';

var JS_DIR = path.resolve(__dirname, 'src/main/resources/META-INF/resources/js');

// Initial
module.exports = {
	entry: path.resolve(JS_DIR, 'src/entry.js'),
	output: {
		filename: 'bundle.js',
		path: './src/main/resources/META-INF/resources/js/dist'
	},
	module: {
		loaders: [
			{
				include: JS_DIR, // Only run this loader on files within the JS directory
				loader: 'babel',
				query: {
					presets: ['es2015', 'react'] // Used for transforming es2015 t0 es5 and jsx to functions
				}
			}
		]
	}
};


// Final

/*
module.exports = {
	devServer: {
		hot: true,
		port: 3000,
		proxy: {
			'**': 'http://0.0.0.0:8080'
		},
		publicPath: DIST_DIR
	},
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000',
		'webpack/hot/only-dev-server',
		path.resolve(JS_DIR, 'src/entry.js')
	],
	module: {
		loaders: [
			{
				include: JS_DIR,
				loader: 'react-hot'
			},
			{
				include: JS_DIR,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: './src/main/resources/META-INF/resources/js/dist',
		publicPath: DIST_DIR
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
*/