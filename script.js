// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const myForm = document.querySelector('form');
const filterOption = document.querySelector('.filter-todo');

// event listeners 

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions

function addTodo(evt) {
    // prevent form from submitting
    evt.preventDefault();

    // create TODO div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value)

    // check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = '';
}

function deleteCheck(evt) {
    // get current element in todo list
    const item = evt.target;
    // console.log(item.classList[0]);
    // detect delete button class
    if (item.classList[0] === 'delete-btn') {
        // select parent element
        const todo = item.parentElement;
        todo.classList.add('vanish');
        // remove todo from local storage;
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    // detect completed button class
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

    }
}

function filterTodo(evt) {
    // select all todos 
    const todos = todoList.childNodes;
    // select each one of list
    todos.forEach(function (todo) {
        // get value of target element
        switch (evt.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // check if already have todos
    let todos;

    if (localStorage.getItem('todos') === null) {
        // if not create array
        todos = [];
    } else {
        // get values from localstorage
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // add todo to array
    todos.push(todo);
    // push it back to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // check if already have todos
    let todos;

    if (localStorage.getItem('todos') === null) {
        // if not create array
        todos = [];
    } else {
        // get values from localstorage
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {

        // create TODO div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // create li
        const newTodo = document.createElement('li');
        newTodo.textContent = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo) {
    // check if already have todos
    let todos;

    if (localStorage.getItem('todos') === null) {
        // if not create array
        todos = [];
    } else {
        // get values from localstorage
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    // create variable to get the text from todo
    const todoIndex = todo.children[0].innerText;
    // match text with array index and remove it
    todos.splice(todos.indexOf(todoIndex), 1);
    // update the values from localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}