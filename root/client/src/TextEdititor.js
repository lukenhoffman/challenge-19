import { saveNote, getNote } from './root/client/src/db.js';

class TextEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.initEvents();
        this.loadContent();
    }

    initEvents() {
        this.editor.addEventListener('input', () => {
            this.saveContent(this.editor.value);
        });

        this.editor.addEventListener('blur', () => {
            this.saveContent(this.editor.value);
        });
    }

    async loadContent() {
        try {
            const note = await getNote();
            if (note && note.content) {
                this.editor.value = note.content;
            }
        } catch (error) {
            console.error("Error loading content:", error);
        }
    }

    async saveContent(content) {
        try {
            await saveNote(content);
        } catch (error) {
            console.error("Error saving content:", error);
        }
    }
}

// Initialize the TextEditor
new TextEditor();
