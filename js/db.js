db.collection("tasks")
  .get()
  .then((res) => {
    res.docs.map((task) => renderTask(task.data(), task.id));
  });
