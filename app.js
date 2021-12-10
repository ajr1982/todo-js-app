//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;

    todoDiv.appendChild(newTodo);
    
    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Clear input value
    
    todoInput.value = '';
    
    //Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append to list
    todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
    const item = e.target;
    //Delete item
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });

    }
    //Mark item as complete
    else if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

    }
    else {
        return false;
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){

        
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break

        }
    });
}

function saveLocalTodos(todo){
    //Check if items already exist in storage
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));

    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}