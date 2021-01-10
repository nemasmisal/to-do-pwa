import * as taskService from './taskService.js';

const tasksEl = () => document.getElementById("tasks");
const formEl = () => document.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
  taskService.getAllTasks().then((tasks) => {
    tasks.map((task, index) => renderTask(task, index));
  });
  tasksEl().addEventListener("click", (evt) => {
    if (evt.target.tagName !== "I") {
      return;
    }
    const id = evt.target.getAttribute("data-id");
    taskService.removeTask(id);
    const task = document.querySelector(`.task[data-id="${id}"]`);
    task.remove();
  });
});

const renderTask = (data) => {
  const htmlTemp = `
  <div class="card-panel task white row" data-id="${data.title}">
      <img src="/img/task.png" alt="task thumb">
      <div class="task-details">
        <div class="task-title">${data.title}</div>
        <div class="task-body">${data.description}</div>
      </div>
      <div class="task-remove">
        <i class="material-icons" data-id="${data.title}">delete_outline</i>
      </div>
    </div>
  `;
  tasksEl().innerHTML += htmlTemp;
};

formEl().addEventListener("submit", (evt) => {
  evt.preventDefault();
  const task = {
    title: formEl().title.value,
    description: formEl().description.value,
  };

  taskService.addTask(task).catch((e) => console.log(e));
  renderTask(task);
  formEl().title.value = "";
  formEl().description.value = "";
});
