## Code to add for final Product

### webpack.config.js

```js
var path = require('path');
var webpack = require('webpack');

var DIST_DIR = '/o/todo-app-webpack-1.0.0/js/dist/';

var JS_DIR = path.resolve(__dirname, 'src/main/resources/META-INF/resources/js');

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
```

### build.gradle
```gradle
dependencies {
	compile group: "com.liferay.portal", name: "com.liferay.portal.kernel", version: "2.0.0"
	compile group: "com.liferay.portal", name: "com.liferay.util.taglib", version: "2.0.0"
	compile group: "javax.portlet", name: "portlet-api", version: "2.0"
	compile group: "javax.servlet", name: "servlet-api", version: "2.5"
	compile group: "jstl", name: "jstl", version: "1.2"
	compile group: "org.osgi", name: "org.osgi.compendium", version: "5.0.0"
}

buildscript {
	dependencies {
		classpath group: "com.liferay", name: "com.liferay.gradle.plugins.node", version: "latest.release"
	}

	repositories {
		maven {
			url "https://cdn.lfrs.sl/repository.liferay.com/nexus/content/groups/public"
		}
	}
}

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

import TodoWithAPI from './components/TodoWithAPI'; // Final Product

window.App = (node) => {
	render(
		<TodoWithAPI />,
		node
	);
}
```