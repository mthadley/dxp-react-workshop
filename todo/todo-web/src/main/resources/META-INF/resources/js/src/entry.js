import React from 'react';
import {render} from 'react-dom';

import TodoWithAPI from './components/TodoWithAPI';

window.App = (node) => {
	render(
		<TodoWithAPI />,
		node
	);
}