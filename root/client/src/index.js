// Assuming you have the db.js for IndexedDB interactions
import { saveNote, getNote } from './db';

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');

    // Retrieve content from IndexedDB and set it in the textarea
    getNote().then(note => {
        if (note && note.content) {
            editor.value = note.content;
        }
    });

    // Save content to IndexedDB when the textarea content changes
    // This uses the "input" event which fires whenever the textarea content changes
    editor.addEventListener('input', (event) => {
        saveNote(editor.value);
    });

    // Optional: Save content when clicking out of the textarea
    editor.addEventListener('blur', (event) => {
        saveNote(editor.value);
    });

    // Register service worker for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, error => {
                console.log('ServiceWorker registration failed: ', error);
            });
        });
    }
});
