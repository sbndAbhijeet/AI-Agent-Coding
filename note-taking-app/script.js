document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesDisplay = document.getElementById('notesDisplay');

    // Load notes from localStorage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Function to display notes
    function displayNotes() {
        notesDisplay.innerHTML = '';
        notes.forEach(function (note, index) {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <span>${note}</span>
                <button data-index="${index}">Delete</button>
            `;
            notesDisplay.appendChild(noteDiv);
        });
    }

    // Display notes on load
    displayNotes();

    // Add note event
    addNoteBtn.addEventListener('click', function () {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            displayNotes();
        }
    });

    // Delete note event (using event delegation)
    notesDisplay.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const indexToDelete = event.target.dataset.index;
            notes.splice(indexToDelete, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
        }
    });
});