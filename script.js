const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const message = document.getElementById('message');
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = savedTasks.map(function (task) {
  if (typeof task === 'string') {
    return { text: task, completed: false };
  }

  return task;
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function (task, index) {
    const listItem = document.createElement('li');
    const taskContent = document.createElement('label');
    const completeCheckbox = document.createElement('input');
    const taskText = document.createElement('span');
    const deleteButton = document.createElement('button');

    taskContent.className = 'task-content';
    completeCheckbox.type = 'checkbox';
    completeCheckbox.className = 'task-checkbox';
    completeCheckbox.checked = task.completed;
    taskText.textContent = task.text;
    taskText.className = task.completed ? 'task-text completed' : 'task-text';
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    completeCheckbox.addEventListener('change', function () {
      task.completed = completeCheckbox.checked;
      saveTasks();
      renderTasks();
    });

    deleteButton.addEventListener('click', function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskContent.appendChild(completeCheckbox);
    taskContent.appendChild(taskText);
    listItem.appendChild(taskContent);
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

  tasks.push({ text: newTask, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  message.hidden = true;
});

renderTasks();
