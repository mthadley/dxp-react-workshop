import React, { Component } from 'react';

class TodoWithAPI extends Component {
	constructor(props) {
		super(props)

		this.state = {
			inputValue: '',
			items: []
		};

		this.completeItem = this.completeItem.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
	}

	componentWillMount() {
		Liferay.Service(
			'/todo.todo/get-todos',
			items => {
				this.setState({items});
			}
		)
	}

	completeItem(index) {
		return () => {
			const items = this.state.items.map(
				(item, i) => {
					if (i === index) {
						item.done = !item.done;

						Liferay.Service(
							'/todo.todo/set-done',
							{
								done: item.done,
								id: item.todoId
							}
						);
					}

					return item;
				}
			);

			this.setState({items});
		}
	}

	handleInputChange(event) {
		this.setState({inputValue: event.target.value});
	}

	handleInputSubmit(event) {
		if (event.key === 'Enter') {
			Liferay.Service(
				'/todo.todo/add-todo',
				{
					description: event.target.value
				},
				(item) => {
					this.setState(
						{
							inputValue: '',
							items: [...this.state.items, item]
						}
					)
				}
			);

		}
	}

	render() {
		const {inputValue, items} = this.state;

		return (
			<div className="todo-app">
				<input
					onChange={this.handleInputChange}
					onKeyPress={this.handleInputSubmit}
					placeholder="Add a to-do"
					value={inputValue}
				/>

				<ol>
					{
						items.map(
							({description, done}, i) => (
								<li
									className={done ? 'completed' : ''}
									key={i}
									onClick={this.completeItem(i)}
								>
									{description}
									<span>Completed</span>
								</li>
							)
						)
					}
				</ol>
			</div>
		);
	}
}

export default TodoWithAPI;