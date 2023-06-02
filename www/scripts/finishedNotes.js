function loadFinishedNotes() {
  const dailyNotesDiv = document.querySelector(".dailyNotes")
  const onceNotesDiv = document.querySelector(".onceNotes")
  let savedNotes = window.localStorage.getItem("finishedNotes") || "[]"
  savedNotes = JSON.parse(savedNotes)
  for (let note of savedNotes) {
    const div = createNoteElement(note.icon, note.name, note.info, false)

    if (note.daily)
      dailyNotesDiv.appendChild(div)
    else
      onceNotesDiv.appendChild(div)
  }
}

document.addEventListener("DOMContentLoaded", e => {
  handleLanguage()
  loadFinishedNotes()
})