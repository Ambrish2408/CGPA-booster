function addNote() {
  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();

  if (title && content) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, content });
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
  }
}

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const list = document.getElementById('noteList');
  list.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${note.title}:</strong> ${note.content} <button onclick="deleteNote(${index})">🗑</button>`;
    list.appendChild(li);
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

// CGPA calculator
function addField() {
  const gradesDiv = document.getElementById('grades');
  const creditInput = document.createElement('input');
  creditInput.className = 'credit';
  creditInput.placeholder = 'Credit';

  const gradeInput = document.createElement('input');
  gradeInput.className = 'grade';
  gradeInput.placeholder = 'Grade Point';

  gradesDiv.appendChild(creditInput);
  gradesDiv.appendChild(gradeInput);
}

function calculateCGPA() {
  const credits = document.querySelectorAll('.credit');
  const grades = document.querySelectorAll('.grade');

  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < credits.length; i++) {
    const credit = parseFloat(credits[i].value);
    const grade = parseFloat(grades[i].value);
    if (!isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      totalPoints += credit * grade;
    }
  }

  const cgpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById('cgpaResult').innerText = isNaN(cgpa)
    ? 'Please enter valid inputs!'
    : `Your CGPA is: ${cgpa}`;
}

window.onload = displayNotes;
