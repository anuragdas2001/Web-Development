var TodoListApp=(function(){
let tasks = [];
const taskslist = document.getElementById("List");
const addTaskInput = document.getElementById("add");
let taskCounter = document.getElementById("tasks-counter");
// console.log("Working Fine");
var a=10;
async function fetchTodos() {
  // GET request
  // fetch('https://jsonplaceholder.typicode.com/todos') //returns a promise
  // .then(function(response){ //response is an object
  //     // console.log(response);
  //     return response.json(); //converts into json
  // }).then(function(data){
  //   //data is json objects
  //   // console.log(data);
  //   tasks=data.slice(0,10);
  //   renderList();
  // })
  // .catch(function(error){
  //   console.log('error',error);
  // });
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks = data.slice(0, 10);
    renderList();
  } catch (error) {
    console.log("error", error);
  }
}
function addTaskToDOM(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  } class="custom-checkbox">
    <label for="${task.id}" class="${task.completed ? "completed" : ""}">${
    task.title
  }</label>
    <img src="xmark-solid.svg"  class="delete" data-id="${task.id}" />
    

  `;

  taskslist.append(li);
}
taskslist.addEventListener("change", function (e) {
  if (e.target.classList.contains("custom-checkbox")) {
    const taskId = e.target.id;
    MarkTaskAsComplete(taskId);
  }
});

function renderList() {
  taskslist.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  // taskCounter.innerHTML = tasks.length;
}

function MarkTaskAsComplete(taskId) {
  //    filter always returns new array
  const task = tasks.filter(function (task) {
    return task.id === Number(taskId);
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.completed = !currentTask.completed;
    renderList();
    showNotification("Task Completed Successfully");
    return;
  }
  showNotification("Could not Complete the task");
}

function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  });
  tasks = newTasks;
  renderList();
  showNotification("Task deleted Successfully");
}

function addTask(task) {
  if (task) {
  //   fetch('https://jsonplaceholder.typicode.com/todos',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     body: JSON.stringify(task),
  //   }) //returns a promise
  //   .then(function(response){
  //     return response.json();
  //   }).then(function(data){
  //   //data is json objects
  //   console.log(data);
  //   tasks.push(task);
  //   // console.log(tasks[0]);
  //   renderList();
  //   showNotification("Task Added Successfully");
    
  // })
  // .catch(function(error){
  //   console.log('error',error);
  // });
    tasks.push(task);
    console.log(tasks[0]);
    renderList();
    showNotification("Task Added Successfully");
    return;
  }
  showNotification("Task cannot be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    // console.log("text", text);
    if (!text) {
      showNotification("Task text cannot be empty");
      return;
    }
    const task = {
      title: text,
      id: Date.now(),
      completed: false,
    };
    e.target.value = "";
    addTask(task);
  }
}
function handleClickListener(e) {
  const target = e.target;
  // console.log(target);

  if (target.className === "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    MarkTaskAsComplete(taskId);
    return;
  }
}
function InitialiseApp() {
  fetchTodos();
  addTaskInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener("click", handleClickListener);
}

return{
    // making this as public 
    initialise : InitialiseApp,
    a:a,

}


})();

// var TodoListApp = (function (){

// })