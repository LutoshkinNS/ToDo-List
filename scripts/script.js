class ToDo {
	constructor(form, input, todoList, todoCompleted, todoContainer) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
		this.todoContainer = document.querySelector(todoContainer);
		this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
	}

	addToStorage() {
		localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
	}

	render() {
		this.todoList.textContent = '';
		this.todoCompleted.textContent = '';
		this.todoData.forEach(this.createItem, this);
		this.addToStorage();
	}

	createItem(todo) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = todo.key;
		li.insertAdjacentHTML('beforeend', `
			<span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		`);

		if (todo.completed) {
			this.todoCompleted.append(li);
		} else {
			this.todoList.append(li);
		}
	}

	addTodo(event) {
		event.preventDefault();
		if (this.input.value.trim()) {
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey(),
			};
			this.todoData.set(newTodo.key, newTodo);
			this.input.value = '';
			this.render();
		} else {
			const message = document.createElement('div');
			message.style.position = 'fixed';
			const coords = this.input.getBoundingClientRect();
			message.style.zIndex = 10;
			message.style.width = 250 + 'px';
			message.style.padding = 5 + 'px';
			message.style.backgroundColor = 'red';
			message.style.borderRadius = 20 + 'px';
			message.style.left = coords.left + 5 + "px";
			message.style.top = coords.bottom + 5 + "px";
			message.innerHTML = 'Поле не должно быть пустым!';
			document.body.append(message);
		}
	}

	generateKey() {
		return Math.random().toString(16).substring(2);
	}

	deleteItem(elem) {
		this.todoData.forEach(item => {
			if (elem.key === item.key) {
				this.todoData.delete(item.key);
				this.render();
			}
		}, this);
	}

	completedItem(elem) {
		this.todoData.forEach(item => {
			if (elem.key === item.key) {
				item.completed = !item.completed;
				this.render();
			}
		}, this);
	}

	handler(event) {
		const target = event.target;
		if (target.matches('.todo-remove')) {
			this.deleteItem(target.closest('.todo-item'));
		} else if (target.matches('.todo-complete')) {
			this.completedItem(target.closest('.todo-item'));
		}
	}

	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.todoContainer.addEventListener('click', this.handler.bind(this));
		this.render();
	}
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
