function getFileNameFromURL(url) {
  const parts = url.split('/');
  const fileName = parts.pop();
  const fileNameParts = fileName.split('.');
  fileNameParts.pop();
  const fileNameWithoutExtension = fileNameParts.join('.');
  return fileNameWithoutExtension;
}

function createNoteElement(_icon, _name, _info, _movable) {
  const div = document.createElement("div")
  let control = _movable ? `<div class="activityControl">
  <div class="left">
      <div class="deleteIcon">✖</div>
  </div>
  <div class="right">
      <div class="acceptIcon">✅</div>
  </div>
</div>`: ""
  div.classList.add("singleActivity")
  div.innerHTML = `<div class="draggable">
      <div class="left">
          <img src="${_icon}" alt="Ikona ${getFileNameFromURL(_icon)}" class="activityIcon">
      </div>
      <div class="right">
          <h3 class="activityName">${_name}</h3>
          <p class="activityInfo">${_info}</p>
  
      </div>
  </div>
  ${control}`
  return div
}

const HOLD_INTERVAL = 1000
const LANGUAGES = {
  en: {
    __dailynotes: "Daily Notes:",
    __longtermnotes: "Long Term Notes:",
    __language: "Language",
    __cz: "Czech",
    __en: "English",
    __sk: "Slovak",
    __esp: "Spanish",
    __de: "German",
    __pl: "Polish",
    __showfinishednotes: "Show finished notes",
    __show: "Show",
    __deletecache: "Delete cache",
    __delete: "Delete",
    __applicationname: "Application name",
    __version: "Version",
    __savechanges: "Save Changes",
    __notetitle: "Note title:",
    __noteinfo: "Describe the note:",
    __repeat: "Repeat",
    __once: "Once",
    __daily: "Daily",
    __niceimage: "Don't forget nice image...",
    __finishedtasks: "Finished Tasks:",
    __finishedgoals: "Finished goals:"
  },
  cz: {
    __dailynotes: "Dnešní úkoly:",
    __longtermnotes: "Dlouhodobé úkoly:",
    __language: "Jazyk",
    __cz: "Čeština",
    __en: "Angličtina",
    __sk: "Slovenština",
    __esp: "Španělština",
    __de: "Němčina",
    __pl: "Polština",
    __showfinishednotes: "Zobrazit hotové úkoly",
    __show: "Zobrazit",
    __deletecache: "Vymazat mezipamět",
    __delete: "Vymazat",
    __applicationname: "Název",
    __version: "Verze",
    __savechanges: "Uložit",
    __notetitle: "Chci nezapomenout...",
    __noteinfo: "Jak to popíšu?",
    __repeat: "Opakovat",
    __once: "Jednou",
    __daily: "Denně",
    __niceimage: "Hezký obrázek k tomu...",
    __finishedtasks: "Splněné úkoly:",
    __finishedgoals: "Splněné cíle:"
  },
  esp: {
    __dailynotes: "Notas diarias:",
    __longtermnotes: "Notas a largo plazo:",
    __language: "Idioma",
    __cz: "Checo",
    __en: "Inglés",
    __sk: "Eslovaco",
    __esp: "Español",
    __de: "Alemán",
    __pl: "Polaco",
    __showfinishednotes: "Mostrar notas terminadas",
    __show: "Mostrar",
    __deletecache: "Eliminar caché",
    __delete: "Eliminar",
    __applicationname: "Nombre de la aplicación",
    __version: "Versión",
    __savechanges: "Guardar cambios",
    __notetitle: "Título de la nota:",
    __noteinfo: "Describe la nota:",
    __repeat: "Repetir",
    __once: "Una vez",
    __daily: "Diariamente",
    __niceimage: "No olvides una imagen bonita...",
    __finishedtasks: "Tareas terminadas:",
    __finishedgoals: "Metas cumplidas:"
  },
  de: {
    __dailynotes: "Tägliche Notizen:",
    __longtermnotes: "Langfristige Notizen:",
    __language: "Sprache",
    __cz: "Tschechisch",
    __en: "Englisch",
    __sk: "Slowakisch",
    __esp: "Spanisch",
    __de: "Deutsch",
    __pl: "Polnisch",
    __showfinishednotes: "Fertige Notizen anzeigen",
    __show: "Anzeigen",
    __deletecache: "Cache löschen",
    __delete: "Löschen",
    __applicationname: "Anwendungsname",
    __version: "Version",
    __savechanges: "Änderungen speichern",
    __notetitle: "Notentitel:",
    __noteinfo: "Beschreibe die Notiz:",
    __repeat: "Wiederholen",
    __once: "Einmal",
    __daily: "Täglich",
    __niceimage: "Vergiss nicht ein schönes Bild...",
    __finishedtasks: "Erledigte Aufgaben:",
    __finishedgoals: "Erreichte Ziele:"
  },
  sk: {
    __dailynotes: "Denné poznámky:",
    __longtermnotes: "Dlhodobé poznámky:",
    __language: "Jazyk",
    __cz: "Čeština",
    __en: "Angličtina",
    __sk: "Slovenčina",
    __esp: "Španielčina",
    __de: "Nemčina",
    __pl: "Poľština",
    __showfinishednotes: "Zobraziť ukončené poznámky",
    __show: "Zobraziť",
    __deletecache: "Vymazať cache",
    __delete: "Vymazať",
    __applicationname: "Názov aplikácie",
    __version: "Verzia",
    __savechanges: "Uložiť zmeny",
    __notetitle: "Názov poznámky:",
    __noteinfo: "Opíšte poznámku:",
    __repeat: "Opakovať",
    __once: "Raz",
    __daily: "Denne",
    __niceimage: "Nezabudnite na pekný obrázok...",
    __finishedtasks: "Dokončené úlohy:",
    __finishedgoals: "Dosiahnuté ciele:"
  },
  pl: {
    __dailynotes: "Notatki codzienne:",
    __longtermnotes: "Notatki długoterminowe:",
    __language: "Język",
    __cz: "Czeski",
    __en: "Angielski",
    __sk: "Słowacki",
    __esp: "Hiszpański",
    __de: "Niemiecki",
    __pl: "Polski",
    __showfinishednotes: "Pokaż zakończone notatki",
    __show: "Pokaż",
    __deletecache: "Usuń pamięć podręczną",
    __delete: "Usuń",
    __applicationname: "Nazwa aplikacji",
    __version: "Wersja",
    __savechanges: "Zapisz zmiany",
    __notetitle: "Tytuł notatki:",
    __noteinfo: "Opisz notatkę:",
    __repeat: "Powtarzaj",
    __once: "Raz",
    __daily: "Codziennie",
    __niceimage: "Nie zapomnij o ładnym obrazku...",
    __finishedtasks: "Zakończone zadania:",
    __finishedgoals: "Zrealizowane cele:"
  }
};

function handleLanguage() {
  let settings = window.localStorage.getItem("settings") || "{}"
  settings = JSON.parse(settings)
  if (settings.language) {
    if (LANGUAGES[settings.language]) {
      for (let el in LANGUAGES[settings.language]) {
        let DOMElement = document.querySelector(`.${el}`)
        if (DOMElement)
          DOMElement.textContent = LANGUAGES[settings.language][el]
        else
          console.log("Couildnt find element: " + el)
      }
    }
  }
}