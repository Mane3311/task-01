const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const message = document.getElementById('message');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function (task, index) {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    const deleteButton = document.createElement('button');

    taskText.textContent = task;
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

addTaskButton.addEventListener('click', function () {
  const newTask = taskInput.value.trim();

  if (newTask === '') {
    message.textContent = 'Please enter a task.';
    message.hidden = false;
    return;
  }

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';
  message.hidden = true;
});

renderTasks();
