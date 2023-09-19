const dbName = 'textEditorDB';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      reject("Error opening db", event);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      let db = event.target.result;
      if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", { keyPath: "id" });
      }
    };
  });
};

export const saveNote = async (noteContent) => {
  const db = await openDB();
  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  store.put({ id: 1, content: noteContent });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => {
      resolve();
    };
    tx.onerror = () => {
      reject("Error writing note");
    };
  });
};

export const getNote = async () => {
  const db = await openDB();
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const request = store.get(1);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject("Error retrieving note");
    };
  });
};
