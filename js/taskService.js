import * as db from "./db.js";
const storeName = "tasks";

export const addTask = (data) => {
  return db.addToDB(storeName, data);
};

export const removeTask = (key) => {
  return db.removeFromDB(storeName, key);
};

export const getAllTasks = () => {
  return db.getAll(storeName);
};
