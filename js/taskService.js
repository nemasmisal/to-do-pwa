const storeName = 'tasks';

const addTask = (data) => {
  return addToDB(storeName, data);
};

const removeTask = (key) => {
  return removeFromDB(storeName, key);
};

const getAllTasks = () => {
  return getAll(storeName);
};

