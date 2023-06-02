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
