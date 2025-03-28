let notes = [];

function getNotesFromStorage() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  }
}

function saveNotesToStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote(note) {
  notes.push(note);
  saveNotesToStorage();
}

function removeNote(index) {
  notes.splice(index, 1);
  saveNotesToStorage();
}

function updateNote(index, newNote) {
  notes[index] = newNote;
  saveNotesToStorage();
}

function loadNotes() {
  getNotesFromStorage();
  const notesList = document.getElementById('notes-list');
  if (notesList) { // Check if notesList is not null
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const noteElement = document.createElement('li');
      noteElement.textContent = note;
      noteElement.dataset.index = index;
      noteElement.addEventListener('dblclick', () => {
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = note;
        noteElement.replaceWith(textInput);
        textInput.addEventListener('blur', () => {
          updateNote(index, textInput.value);
          textInput.replaceWith(noteElement);
          noteElement.textContent = textInput.value;
        });
      });
      noteElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        removeNote(index);
      });
      notesList.appendChild(noteElement);
    });
  }
}

function addNoteButtonHandler() {
  const addNoteInput = document.getElementById('add-note-input');
  const noteText = addNoteInput.value.trim();
  if (noteText) {
    addNote(noteText);
    addNoteInput.value = '';
  }
  loadNotes();
}

document.addEventListener('DOMContentLoaded', () => {
  getNotesFromStorage();
  const addNoteButton = document.getElementById('add-note-button');
  if (addNoteButton) { // Check if addNoteButton is not null
    addNoteButton.addEventListener('click', addNoteButtonHandler);
  }
  loadNotes();
});