const DB_NAME = '';
const DB_VERSION = 1;

const isSupported = () => {
  return Boolean('indexedDB' in window);
};

const openDB = () => {
  return new Promise((resolve, reject) => {
    if (!isSupported()) {
      return;
    }
    const openRequest = indexedDB.open(DB_NAME, DB_VERSION);
    openRequest.onerror = (err) => {
      reject('something went wrong ' + err);
    };
    openRequest.onsuccess = (evt) => {
      const db = evt.target.result;
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { autoIncrement : true });
      }
      resolve(db);
    };
    openRequest.onupgradeneeded = (evt) => {
      const db = evt.target.result;
      const objectStore = {};
      if (!db.objectStoreNames.contains('tasks')) {
        objectStore.store = db.createObjectStore('tasks', { autoIncrement : true });
      }
      objectStore.store.transaction.oncomplete = () => resolve(db);
    };
  });
};

const getFromDB = async (storeName, key) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const request = db.transaction(storeName).objectStore(storeName).get(key);
      request.onsuccess = (evt) => resolve(evt.target.result);
      request.onerror = (evt) => reject(evt);
    });
  });
};

const addToDB = (storeName, data) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName)
        .put(data);
      request.onsuccess = (evt) => resolve(evt.target.result);
      request.onerror = (evt) => reject(evt);
    });
  });
};

const removeFromDB = (storeName, key) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName)
        .delete(key);
      request.onsuccess = (evt) => resolve(evt.target.result);
      request.onerror = (evt) => reject(evt);
    });
  });
};

const getAll = (storeName) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const request = db.transaction(storeName).objectStore(storeName).getAll();
      request.onsuccess = (evt) => resolve(evt.target.result);
      request.onerror = (evt) => reject(evt);
    });
  });
};