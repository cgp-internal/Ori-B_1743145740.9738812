let notes = [];

function getNotesFromStorage() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  } else {
    notes = [];
  }
}

function saveNotesToStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote(note) {
  notes.push(note);
  saveNotesToStorage();
  loadNotes();
}

function removeNote(index) {
  notes.splice(index, 1);
  saveNotesToStorage();
  loadNotes();
}

function updateNote(index, newNote) {
  notes[index] = newNote;
  saveNotesToStorage();
  loadNotes();
}

function loadNotes() {
  getNotesFromStorage();
  const notesList = document.getElementById('notes-list');
  if (notesList) { 
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
  getNotesFromStorage(); // added this line to refresh notes from storage
}

function addNoteButtonHandler() {
  const addNoteInput = document.getElementById('add-note-input');
  const noteText = addNoteInput.value.trim();
  if (noteText) {
    addNote(noteText);
    addNoteInput.value = '';
    loadNotes(); // added this line to refresh the notes list
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getNotesFromStorage();
  const addNoteButton = document.getElementById('add-note-button');
  if (addNoteButton) { 
    addNoteButton.addEventListener('click', addNoteButtonHandler);
  }
  loadNotes();
});