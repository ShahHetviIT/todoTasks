// TO SET DAY OF WEEK
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();
let day = weekday[d.getDay()];

// TO SET MONTH OF YEAR
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dd = new Date();
let monOfYear = month[dd.getUTCMonth()];

// TO SET DATE
const date = new Date();

document.getElementById("fullDate").innerHTML =
  day + ", " + monOfYear + " " + date.getDate();

// TO ADD INCOMPLETE TASK
var todoCompleteList = JSON.parse(localStorage.getItem("todoscomplete")) || [];
var todoIncompleteList = JSON.parse(localStorage.getItem("todosincomplete")) || [];

var form = document.getElementById("newTask");
var inptask = document.getElementById("taketask");
var list = document.getElementById("listOfTasks");
var completeTaskList = document.getElementById("listOfCompleteTask");

function renderTasks() {
  list.innerHTML = ""; // Clear the existing tasks

  todoIncompleteList.forEach(function(todo) {
    var taskElement = document.createElement("div");
    taskElement.className = "newTaskRow";
    taskElement.innerHTML = `
        <div class="togap">
          <button class="ckeck">
            <i
              class="fa-sharp fa-regular fa-circle-check fa-lg"
              style="color: #8e8f90"
            ></i>
          </button>
          <span id="taskname"> 
            ${todo.text} 
          </span>
        </div>
        <button onclick="deleteToDoTask(${todo.id});" class="delete">
        <i class="fa-regular fa-trash-can fa-lg" style="color: #8e8f90"></i>
        </button>`;

    list.appendChild(taskElement);
  });
}

function renderCompleteTasks(){
  completeTaskList.innerHTML = "";

  todoCompleteList.forEach(function(todo1){
      var completeTaskElement = document.createElement("div");
      completeTaskElement.className = "completeNewTaskRow";
      completeTaskElement.innerHTML = `
      <div class="togap">
        <button class="ckeck">
          <i
            class="fa-sharp fa-regular fa-circle-check fa-lg"
            style="color: #8e8f90"
          ></i>
        </button>
        <span id="taskname"> 
          ${todo1.text} 
        </span>
      </div>
      <button onclick="deleteToDoTask(${todo1.id});" class="delete">
      <i class="fa-regular fa-trash-can fa-lg" style="color: #8e8f90"></i>
      </button>`;

      completeTaskList.appendChild(taskElement);
  });
}

function addToDoTask() {
  if (document.querySelector("#newTask input").value.length == 0) {
    alert("Please Enter a Task");
  } else {
    var todoText = inptask.value.trim();

    if (todoText) {
      var todo = {
        id: Date.now(),
        text: todoText,
      };

      todoIncompleteList.push(todo);

      localStorage.setItem("todosincomplete", JSON.stringify(todoIncompleteList));
    }

    renderTasks();

    inptask.value = "";
  }
}

function removeToDoStorage(todoId) {
  var index = todoIncompleteList.findIndex(function (task) {
    return task.id === todoId;
  });

  if(index !== -1){
    var removedTodo = todoIncompleteList.splice(index,1)[0];
    todoCompleteList.push(removedTodo);

    localStorage.setItem('todosincomplete',JSON.stringify(todoIncompleteList));
    localStorage.setItem('todoscomplete',JSON.stringify(todoCompleteList));

    renderCompleteTasks();
  }
}

function deleteToDoTask(todoId) {
  removeToDoStorage(todoId);
  renderTasks();
}

// Initial rendering of tasks from local storage
renderTasks();
renderCompleteTasks();
