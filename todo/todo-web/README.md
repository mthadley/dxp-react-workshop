## Code to add for final Product

### webpack.config.js

```js
var path = require('path');
var webpack = require('webpack');

var DIST_DIR = '/o/todo-app-webpack-1.0.0/js/dist/';

var JS_DIR = path.resolve(__dirname, 'src/main/resources/META-INF/resources/js/');

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
		path.resolve(JS_DIR, '/src/entry.js')
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
```

### build.gradle
```gradle
import com.liferay.gradle.plugins.node.tasks.ExecuteNodeTask

task buildWebpack(type: ExecuteNodeTask)

buildWebpack {
	dependsOn npmInstall

	args = "./node_modules/webpack/bin/webpack.js"
}

classes {
	dependsOn buildWebpack
}
```

### view.jsp
```html
<div id="todoAppWebpack"></div>

<script src="/o/todo-app-webpack-1.0.0/js/dist/bundle.js"></script>

<aui:script>
	window.App(document.getElementById('todoAppWebpack'));
</aui:script>
```

## entry.js
```js
import React from 'react';
import {render} from 'react-dom';

// import App from './components/App';
import Todo from './components/Todo'; // Final Product

window.App = (node) => {
	render(
		<Todo />,
		node
	);
}
```