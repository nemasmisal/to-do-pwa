const tasksEl = () => document.getElementById('tasks');
const formEl = () => document.querySelector('form');
const toastEl = 

document.addEventListener('DOMContentLoaded', () => {
  getAllTasks().then((tasks) => {
    tasks.map((task, index) => renderTask(task, index));
  });
  tasksEl().addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'I') { return; }
    const id = evt.target.getAttribute('data-id');
    removeTask(Number(id));
    const task = document.querySelector(`.task[data-id="${id}"]`);
    task.remove();
    M.toast({
      html: '<h6>Task removed!</h6>',
      classes: 'rounded deep-purple darken-2 toast-msg',
      displayLength: 1500,
    });
  });
});

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
  tasksEl().innerHTML += htmlTemp;
};

formEl().addEventListener('submit', (evt) => {
  evt.preventDefault();
  const task = {
    title: formEl().title.value,
    description: formEl().description.value,
  };

  addTask(task).then(key => {
  renderTask(task, key);
  }).catch((e) => console.log(e));
  formEl().title.value = '';
  formEl().description.value = '';
  M.toast({
    html: '<h6>New task added!</h6>',
    classes: 'rounded deep-purple darken-2 toast-msg',
    displayLength: 1500,
  });
});
