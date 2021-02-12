'use strict'

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');
	
	
	let todoData = [];

	todoData = JSON.parse(localStorage.getItem('data'));

	const render = function () {

	todoList.textContent = '';
	todoCompleted.textContent = '';
	
	todoData.forEach(function(item) {
	
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
		'<div class="todo-buttons">' +
		'<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>' +
		'</div>';

		if (item.remove) {
			return;
		} else if (item.completed) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		};

		const btnTodoCompleted = li.querySelector('.todo-complete');

		btnTodoCompleted.addEventListener('click', function() { 
			item.completed = !item.completed;
			render();
		});

		const btnTodoRemove = li.querySelector('.todo-remove');

		btnTodoRemove.addEventListener('click', function() {
			item.remove = true;
			btnTodoRemove.parentNode.parentNode.remove();
			render();
		});
	});

	localStorage.setItem('data', JSON.stringify(todoData));
};


todoControl.addEventListener('submit', function (event) {
	event.preventDefault();

	if (headerInput.value !== '') {
		const newTodo = {
			value: headerInput.value,
			completed: false,
		};

		todoData.push(newTodo);

	};
	headerInput.value = '';
	
	render();
});

render();