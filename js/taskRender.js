const tasksEl = () => document.getElementById('tasks');
const formEl = () => document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
  getAllTasks().then((tasks) => {
    tasks.map(task => renderTask(task));
  });
  tasksEl().addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'I') { return; }
    const id = evt.target.getAttribute('data-id');
    removeTask(Number(id));
    const task = document.querySelector(`.task[data-id="${id}"]`);
    task.remove();
    toastMsg('Task removed!');
  });
});

const renderTask = (data) => {
  const htmlTemp = `
  <div class="card-panel task white row" data-id="${data.id}">
      <img src="/img/task.png" alt="task thumb">
      <div class="task-details">
        <div class="task-title">${data.title}</div>
        <div class="task-body">${data.description}</div>
      </div>
      <div class="task-remove">
        <i class="material-icons" data-id="${data.id}">delete_outline</i>
      </div>
    </div>
  `;
  tasksEl().innerHTML += htmlTemp;
};

formEl().addEventListener('submit', (evt) => {
  evt.preventDefault();
  const task = {
    title: formEl().title.value,
    description: formEl().description.value,
    id: Date.now()
  };

  addTask(task).catch((e) => console.log(e));
  renderTask(task);
  formEl().title.value = '';
  formEl().description.value = '';
  toastMsg('New task added!');
});
