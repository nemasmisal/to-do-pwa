import * as db from "./db.js";
const storeName = "tasks";

const addTask = (data) => {
  return db.addToDB(storeName, data);
};

const removeTask = (key) => {
  return db.removeFromDB(storeName, key);
};

const getAllTasks = () => {
  return db.getAll(storeName);
};

export { addTask, removeTask, getAllTasks };
