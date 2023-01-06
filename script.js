const tasks = [];
let taskId = 0;

const addTask = () => {
  // check that the input is not empty
  if (document.getElementById('task').value === '') {
    return;
  }

  // add task object to the array
  tasks.push({
    task_id: taskId,
    text: document.getElementById('task').value,
    done: false
  });
  taskId++;

  // add task to the DOM
  const listTasks = document.querySelector('.listTasks');
  const task = document.createElement('div');
  task.innerHTML = `
    <input type="checkbox" data-task-id="${taskId - 1}"> ${document.getElementById('task').value}
    <button class="delete-button">X</button>
  `;
  listTasks.appendChild(task);

  // clear the input field
  document.getElementById('task').value = '';
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

const doneTask = (event) => {
  // get the task_id of the clicked task
  const taskId = event.target.dataset.taskId;

  // find the task object in the array and update its done property
  const task = tasks.find((task) => task.task_id == taskId);
  task.done = !task.done;

  // update the style of the task in the DOM
  if (task.done) {
    event.target.parentElement.style.textDecoration = 'line-through';
    event.target.parentElement.style.color = 'red';
  } else {
    event.target.parentElement.style.textDecoration = 'none';
    event.target.parentElement.style.color = 'black';
  }
}

document.querySelector('.listTasks').addEventListener('click', (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    doneTask(event);
  }
});

const deleteTask = (event) => {
  // get the task_id of the clicked task
  const taskId = event.target.parentElement.querySelector('input[type="checkbox"]').dataset.taskId;

  // find the task object in the array and remove it
  const taskIndex = tasks.findIndex((task) => task.task_id == taskId);
  tasks.splice(taskIndex, 1);

  // remove the task from the DOM
  event.target.parentElement.remove();
}