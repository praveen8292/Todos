let todoItemsContainer = document.getElementById('todoItemsContainer');

let addTodoButton = document.getElementById('addTodoButton');

let saveTodoButton = document.getElementById('saveTodoButton');

function getTodoListFromLocalStorage(){
    let stringifideTodoList=localStorage.getItem('todoList');
    let parsedTodoList=JSON.parse(stringifideTodoList);
    if (parsedTodoList===null) {
        return [];
    }else{
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage()


saveTodoButton.onclick=function(){
    localStorage.setItem('todoList',JSON.stringify(todoList))
}

addTodoButton.onclick=function(){
    onAddTodo()
}

function onTodoStatusChange(checkboxId,labelId, todoId){
    let checkboxElement = document.getElementById(checkboxId)
    let labelElement = document.getElementById(labelId) 
        labelElement.classList.toggle("checked")
    
    
    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniquNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    })


    let todoObject = todoList[todoObjectIndex]

    if(todoObject.isChecked === true){
        todoObject.isChecked = false
    }else{
        todoObject.isChecked = true
    }

}

function onDeleteIcon(todoId){
    let todoElement = document.getElementById(todoId)
    todoItemsContainer.removeChild(todoElement)
    let deleteIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = 'todo' + eachTodo.uniquNo;
        if (eachTodo === todoId){
            return true;
        }else{
            return false
        }
    })
    todoList.splice(deleteIndex, 1);
    console.log(todoList)
}

function creatAndAppendTodo(todo){

    let checkboxId = 'checkbox' + todo.uniquNo;
    let labelId = 'label' + todo.uniquNo;
    let todoId = 'todo' + todo.uniquNo;

    let todoElement = document.createElement('li');
    todoElement.classList.add('todo-item-container', 'd-flex', 'flex-row');
    todoElement.id=todoId
    todoItemsContainer.appendChild(todoElement);


    let inputElement = document.createElement("input");
    inputElement.type = 'checkbox';
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add('checkbox-input');
    inputElement.onclick=function(){
    onTodoStatusChange(checkboxId, labelId)
    }
    todoElement.appendChild(inputElement);


    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container','d-flex', 'flex-row');
            
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.classList.add('checkbox-label');
    labelElement.textContent=todo.text;
    labelElement.id=labelId

    if(todo.isChecked === true){
        labelElement.classList.add('checked')
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add('delete-icon-container');

    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIcon.onclick=function(){
        onDeleteIcon(todoId)
    }
    deleteIconContainer.appendChild(deleteIcon)
}

function onAddTodo(){
    let todosCount = todoList.length;
        todosCount = todosCount + 1;

    let todoUserInput = document.getElementById('todoUserInput');
    let userInputValue = todoUserInput.value;

    if (userInputValue === ''){
        alert('Enter valid Input')
        return
    }

    let newTodo = {
        text : userInputValue,
        uniquNo : todosCount,
        isChecked : false
    }

        todoList.push(newTodo)

        creatAndAppendTodo(newTodo)
        todoUserInput.value = ''
    
}


for (let eachTodo of todoList){
    creatAndAppendTodo(eachTodo)

}


