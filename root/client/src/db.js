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
      db.createObjectStore("notes", { keyPath: "id" });
    };
  });
};

const saveNote = async (noteContent) => {
  const db = await openDB();
  const tx = db.transaction("notes", "readwrite");
  const store = tx.objectStore("notes");
  store.put({ id: 1, content: noteContent });
  return tx.complete;
};

const getNote = async () => {
  const db = await openDB();
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  return store.get(1);
};
