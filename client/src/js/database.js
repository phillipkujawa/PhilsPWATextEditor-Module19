import { openDB } from 'idb';

const initdb = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

const dbPromise = initdb();

export const putDb = async (content) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const item = {
      value: content,
      date: new Date()
    };
    await store.add(item);
    await tx.done;
    console.log('Content added to DB');
  } catch (error) {
    console.error('Error while adding content to DB:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const contentArray = await store.getAll();

    // For the sake of this example, we're getting the latest content by date.
    if (contentArray.length > 0) {
      contentArray.sort((a, b) => b.date - a.date);  // Sort by date descending
      return contentArray[0].content;
    }
    console.log('No content found in DB');
    return null;
  } catch (error) {
    console.error('Error while fetching content from DB:', error);
    return null;
  }
};

initdb();
