// Elements on the page
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const deleteAll = document.querySelector('#deleteAll');

let tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];

tasks.forEach(function (task) {
  const cssClass = task.done ? "task-title task-title-done" : "task-title";

  // To create a layout for a new task
  const taskHTML = `<li id=${task.id} class="list-group-item">
  <span class="${cssClass}">${task.text}</span>
  <div class="task-item-buttons">
    <button type="button" data-action="done" class="btn-items">
      <img class="pic" src="/icons/paper.png" alt="Done">
    </button>
    <button type="button" data-action="delete" class="btn-items">
      <img class="pic" src="/icons/free-icon-trash-3491490.png" alt="Delete">
    </button>
  </div>
</li>`;
  
  // To add the layout on page
  tasksList.insertAdjacentHTML('beforeend', taskHTML);
})

// Adding a task
form.addEventListener('submit', addTask);

//Deleting a task
tasksList.addEventListener('click', deleteTask);

//Marking a task as a 'done'
tasksList.addEventListener('click', doneTask);

function addTask(event) {
  // cancel submitting form
  event.preventDefault();

  // To take text from input
  const taskText = taskInput.value

  // Object as a task
  const newTask = {
    id: Date.now(),
    text: taskText,
    done:false,
  };

  // To add a task to the array
  tasks.push(newTask)

  saveToLocalStorage();

  const cssClass = newTask.done ? "task-title task-title-done" : "task-title";

  // To create a layout for a new task
  const taskHTML = `<li id=${newTask.id} class="list-group-item">
  <span class="${cssClass}">${newTask.text}</span>
  <div class="task-item-buttons">
    <button type="button" data-action="done" class="btn-items">
      <img class="pic" src="/icons/paper.png" alt="Done">
    </button>
    <button type="button" data-action="delete" class="btn-items">
      <img class="pic" src="/icons/free-icon-trash-3491490.png" alt="Delete">
    </button>
  </div>
</li>`;
  
  // To add the layout on page
  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  // To clean the field of input
  taskInput.value = '';
  taskInput.focus();
}

function deleteTask(event) {
  if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    // Deleting a task by using filter the array
    tasks = tasks.filter(task => task.id !== id)

    saveToLocalStorage()

    parentNode.remove();
  }
}

function doneTask(event) {
  if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    const task = tasks.find(task => task.id === id)

    task.done = !task.done;

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('span');
    taskTitle.classList.toggle('task-title-done')
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}