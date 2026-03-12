let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let userInputElement = document.getElementById("todoUserInput");

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  return stringifiedTodoList ? JSON.parse(stringifiedTodoList) : [];
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  alert("Tasks Saved ✅");
};

addTodoButton.onclick = function () {
  onAddTodo();
};

userInputElement.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    onAddTodo();
  }
});

function onAddTodo() {
  let userInputValue = userInputElement.value;

  if (userInputValue === "") {
    alert("Enter valid text!");
    return;
  }

  todosCount++;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;

  let li = document.createElement("li");
  li.id = todoId;

  let leftDiv = document.createElement("div");
  leftDiv.classList.add("task-left");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isChecked;

  let span = document.createElement("span");
  span.textContent = todo.text;
  span.classList.add("task-text");

  if (todo.isChecked) {
    span.classList.add("checked");
  }

  checkbox.onclick = function () {
    span.classList.toggle("checked");
    todo.isChecked = !todo.isChecked;
  };

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash", "delete-btn");

  deleteIcon.onclick = function () {
    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";
    setTimeout(() => {
      todoItemsContainer.removeChild(li);
      todoList = todoList.filter(t => t.uniqueNo !== todo.uniqueNo);
    }, 300);
  };

  li.appendChild(leftDiv);
  li.appendChild(deleteIcon);

  todoItemsContainer.appendChild(li);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}