let tasks = [];
const taskslist = document.getElementById('List');
const addTaskInput = document.getElementById('add');
let taskCounter = document.getElementById('tasks-counter');
// console.log("Working Fine");
function addTaskToDOM(task) {
  const li = document.createElement('li');

  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
    <label for="${task.id}" class="${task.done ? "completed" : ""}">${
    task.text
  }</label>
    <img src="trash-solid.svg"  class="delete" data-id="${task.id}" />
    

  `;

  taskslist.append(li);
}
taskslist.addEventListener('change', function (e) {
  if (e.target.classList.contains('custom-checkbox')) {
    const taskId = e.target.id;
    MarkTaskAsComplete(taskId);
  }
});

function renderList() {
  taskslist.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  // taskCounter.innerHTML = tasks.length;
}

function MarkTaskAsComplete(taskId) {
  //    filter always returns new array
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification('Task Completed Successfully');
    return;
  }
  showNotification('Could not Complete the task');
}

function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification('Task deleted Successfully');
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    // console.log(tasks[0]);
    renderList();
    showNotification('Task Added Successfully');
    return;
  }
  showNotification('Task cannot be added');
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    // console.log("text", text);
    if (!text) {
      showNotification('Task text cannot be empty');
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    e.target.value = '';
    addTask(task);
  }
}
function handleClickListener(e) {
  const target = e.target;
  // console.log(target);

  if (target.className === 'delete') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === 'custom-checkbox') {
    const taskId = target.id;
    MarkTaskAsComplete(taskId);
    return;
  }
}
function InitialiseApp() {
  addTaskInput.addEventListener('keyup', handleInputKeyPress);
  document.addEventListener('click', handleClickListener);
}

InitialiseApp();
