class TextEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.initEvents();
        this.loadContent();
    }

    initEvents() {
        // Save content when textarea content changes
        this.editor.addEventListener('input', () => {
            this.saveContent(this.editor.value);
        });

        // Save content when clicking out of the textarea
        this.editor.addEventListener('blur', () => {
            this.saveContent(this.editor.value);
        });
    }

    async loadContent() {
        try {
            const note = await this.getNote();
            if (note && note.content) {
                this.editor.value = note.content;
            }
        } catch (error) {
            console.error("Error loading content:", error);
        }
    }

    async saveContent(content) {
        try {
            await this.saveNote(content);
        } catch (error) {
            console.error("Error saving content:", error);
        }
    }

    async getNote() {
        // Replace with actual IndexedDB logic or other storage mechanism
        return { content: localStorage.getItem('note') };
    }

    async saveNote(content) {
        // Replace with actual IndexedDB logic or other storage mechanism
        localStorage.setItem('note', content);
    }
}

// Initialize the TextEditor
new TextEditor();
