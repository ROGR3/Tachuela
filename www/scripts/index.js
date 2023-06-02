const newNoteBtn = document.getElementById('newNote');
const dailyNotesDiv = document.querySelector(".dailyNotes")
const onceNotesDiv = document.querySelector(".onceNotes")
const settingsBtn = document.querySelector("#openSettings")
const settingsDiv = document.querySelector("#settings")
const finishedNotesBtn = document.querySelector("#finishedBtn")
const deleteMemoryBtn = document.querySelector("#deleteMemoryBtn")
const saveBtn = document.querySelector("#saveBtn")
const languageSelect = document.querySelector("#languageSelect")


let activities = document.querySelectorAll('.singleActivity');
let translation = 0;
let day = (new Date()).getUTCDate()
const defaultNotes = `[
    {
      "name": "Usmát se",
      "info": "",
      "daily": true,
      "icon": "./assets/ikony/Jazyky.svg",
      "date": ${day}
    },
    {
      "name": "Jít na procházku",
      "info": "",
      "daily": true,
      "icon": "./assets/ikony/Hory.svg",
      "date": ${day}
    },
    {
      "name": "Číst knihu",
      "info": "",
      "daily": true,
      "icon": "./assets/ikony/Cteni.svg",
      "date": ${day}
    },
    {
      "name": "Opravit televizi",
      "info": "",
      "daily": false,
      "icon": "./assets/ikony/Oprava.svg",
      "date": ${day}
    },
    {
      "name": "Naučit se používat Tachuelu",
      "info": "",
      "daily": false,
      "icon": "./assets/ikony/Cip.svg",
      "date": ${day}
    }
  ]`


function handleActivities() {
    activities = document.querySelectorAll('.singleActivity');
    activities.forEach((activity) => {
        let startX;
        let isMoving = false;
        const maxDrag = 70
        translation = 0
        const draggableDiv = activity.querySelector(".draggable")
        const deleteIcon = activity.querySelector(".activityControl .left")
        const acceptIcon = activity.querySelector(".activityControl .right")
        deleteIcon.addEventListener("click", e => {
            checkActivity(activity, false)
        })
        acceptIcon.addEventListener("click", e => {
            checkActivity(activity)
        })

        activity.addEventListener("dblclick", e => {
            checkActivity(activity)
        })


        activity.addEventListener('touchstart', handleTouchStart, { passive: true });
        activity.addEventListener('touchmove', handleTouchMove, { passive: true });
        activity.addEventListener('touchend', handleTouchEnd, { passive: true });

        function handleTouchStart(event) {
            startX = event.touches[0].clientX;
            isMoving = true;
        }

        function handleTouchMove(event) {
            if (!isMoving) return;

            const currentX = event.touches[0].clientX;
            const diffX = currentX - startX;

            translation += diffX;
            startX = currentX;

            if (translation < -maxDrag) {
                translation = -maxDrag;
            } else if (translation > maxDrag) {
                translation = maxDrag;
            }

            updatePosition();
        }

        function handleTouchEnd() {
            isMoving = false;
            translation = translation > (maxDrag - 1) ? maxDrag : translation < -(maxDrag - 1) ? -maxDrag : 0;
            updatePosition();
        }
        function updatePosition() {
            draggableDiv.style.transform = `translateX(${translation}px)`;
        }

    });

    function checkActivity(_activity, _shouldSave = true) {
        let note = {

            name: _activity.querySelector(".activityName").innerText.trim(),
            info: _activity.querySelector(".activityInfo").innerText.trim(),
            daily: _activity.parentElement.classList.contains("dailyNotes"),
            icon: _activity.querySelector(".activityIcon").src,
            date: (new Date()).getUTCDate()
        }
        let notesStorage = window.localStorage.getItem("todoNotes")
        notesStorage = JSON.parse(notesStorage)
        notesStorage = notesStorage.filter(obj => !(obj.name == note.name && obj.info == note.info && obj.daily == note.daily && getFileNameFromURL(note.icon) == getFileNameFromURL(obj.icon)))
        console.log(getFileNameFromURL(note.icon))
        console.log(notesStorage)
        window.localStorage.setItem("todoNotes", JSON.stringify(notesStorage))
        if (_shouldSave) {
            let finishedStorage = window.localStorage.getItem("finishedNotes") || "[]"
            finishedStorage = JSON.parse(finishedStorage)
            finishedStorage.push(note)
            console.log("Marking: " + JSON.stringify(note))
            window.localStorage.setItem("finishedNotes", JSON.stringify(finishedStorage))
            _activity.classList.add("removed");
        } else {
            _activity.classList.add("checked");
        }

        setTimeout(() => {
            _activity.remove()
            handleEmptyLists()
        }, 1000)

    }
    document.addEventListener('click', e => {
        if (!e.target.closest('.singleActivity')) {
            activities.forEach((activity) => {
                const draggableDiv = activity.querySelector('.draggable');
                translation = 0;
                draggableDiv.style.transform = 'translateX(0)';
            });
        }
        settingsDiv.style.display = "none"
        newNoteBtn.style.display = "flex"
    });
}

function loadNotes() {
    handleYesterday()
    let savedNotes = window.localStorage.getItem("todoNotes") || "[]"
    if (savedNotes == "[]" && window.localStorage.getItem("finishedNotes") == "[]")
        savedNotes = defaultNotes
    savedNotes = JSON.parse(savedNotes)
    for (let note of savedNotes) {

        const div = createNoteElement(note.icon, note.name, note.info, true)

        if (note.daily)
            dailyNotesDiv.appendChild(div)
        else
            onceNotesDiv.appendChild(div)
    }
    handleEmptyLists()
    window.localStorage.setItem("todoNotes", JSON.stringify(savedNotes))
}

function handleYesterday() {
    let doneNotes = window.localStorage.getItem("finishedNotes") || "[]"
    doneNotes = JSON.parse(doneNotes)
    let currentDay = (new Date()).getUTCDate()
    let renewableNotes = doneNotes.filter(note => (note.date !== currentDay && note.daily === true))
    let currentStorage = JSON.parse(window.localStorage.getItem("todoNotes") || "[]")
    for (note of renewableNotes) {
        doneNotes = doneNotes.filter(obj => !(obj.name == note.name && obj.info == note.info && obj.daily == note.daily && getFileNameFromURL(note.icon) == getFileNameFromURL(obj.icon)))
    }
    currentStorage = currentStorage.concat(renewableNotes)
    window.localStorage.setItem("finishedNotes", JSON.stringify(doneNotes))
    window.localStorage.setItem("todoNotes", JSON.stringify(currentStorage))
}
function handleEmptyLists() {
    if (!dailyNotesDiv.textContent.trim())
        dailyNotesDiv.innerHTML = "<p>Pro dnešek máte vše splněno!</p>"
    if (!onceNotesDiv.textContent.trim())
        onceNotesDiv.innerHTML = "<p>Vytyčte si nové cíle!</p>"
}



settingsBtn.addEventListener("click", e => {
    e.stopPropagation()
    settingsDiv.style.display = (settingsDiv.style.display == "block" ? "none" : "block")
    newNoteBtn.style.display = (newNoteBtn.style.display == "none" ? "flex" : "none")
    let settings = JSON.parse(window.localStorage.getItem("settings") || "{}")
    languageSelect.value = settings.language
})
settingsDiv.addEventListener("click", e => e.stopPropagation())
finishedNotesBtn.addEventListener("click", e => window.location.href = "./views/finishedNotes.html")
let willDeleteStorage = false
deleteMemoryBtn.addEventListener("click", e => {
    if (deleteMemoryBtn.textContent == "Vymazáno") {
        deleteMemoryBtn.textContent = "Obnovuje se"
        willDeleteStorage = false
        setTimeout(() => {
            deleteMemoryBtn.textContent = "Obnovena"
        }, 350)

    } else {
        deleteMemoryBtn.textContent = "Vymazává se"
        willDeleteStorage = true
        setTimeout(() => {
            deleteMemoryBtn.textContent = "Vymazáno"
        }, 300)
    }

})
saveBtn.addEventListener("click", e => {
    settingsDiv.style.display = "none"
    if (willDeleteStorage) {
        window.localStorage.clear()
    }
    let obj = {
        language: languageSelect.value
    }
    window.localStorage.setItem("settings", JSON.stringify(obj))
    window.location.href = ""
})
handleLanguage()
loadNotes()
handleActivities()

setTimeout(function () {
    navigator.splashscreen.hide();
}, 150);