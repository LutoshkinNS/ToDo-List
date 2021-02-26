const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

const data = JSON.parse(localStorage.getItem('data'));

if (data !== null) {
	todoData = data;
}

const render = function() {


	todoList.textContent = '';
	todoCompleted.textContent = '';

	todoData.forEach(item => {

		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
		'<div class="todo-buttons">' +
		'<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>' +
		'</div>';

		if (item.completed) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		const btnTodoCompleted = li.querySelector('.todo-complete');

		btnTodoCompleted.addEventListener('click', () => {
			item.completed = !item.completed;
			render();
		});

		const btnTodoRemove = li.querySelector('.todo-remove');

		btnTodoRemove.addEventListener('click', () => {
			todoData.splice(todoData.indexOf(item), 1);
			render();
		});
	});

	localStorage.setItem('data', JSON.stringify(todoData));
};


todoControl.addEventListener('submit', event => {
	event.preventDefault();

	if (headerInput.value !== '') {
		const newTodo = {
			value: headerInput.value,
			completed: false,
		};

		todoData.push(newTodo);
	}

	headerInput.value = '';

	render();
});

render();
