import { addTask, removeTask, getAllTasks } from "./taskService.js";

const tasks = () => document.getElementById("tasks");

const renderTask = (data, id) => {
  const htmlTemp = `
  <div class="card-panel task white row" data-id="${id}">
      <img src="/img/task.png" alt="task thumb">
      <div class="task-details">
        <div class="task-title">${data.title}</div>
        <div class="task-body">${data.description}</div>
      </div>
      <div class="task-remove">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  tasks().innerHTML += htmlTemp;
};

document.addEventListener("DOMContentLoaded", function () {
  //nav menu
  const menu = () => document.querySelector(".side-menu");
  M.Sidenav.init(menu(), { edge: "right" });
  //add new task form
  const form = () => document.querySelector(".side-form");
  M.Sidenav.init(form(), { edge: "left" });
  //add all existing tasks
  getAllTasks().then((tasks) => {
    tasks.map((task, index) => renderTask(task, ++index)); //increment index ot start from 1 instead 0
  });
});

const form = () => document.querySelector("form");
form().addEventListener("submit", (evt) => {
  evt.preventDefault();
  const task = {
    title: form().title.value,
    description: form().description.value,
  };

  addTask(task).catch((e) => console.log(e));
  renderTask(task);
  form().title.value = "";
  form().description.value = "";
});
