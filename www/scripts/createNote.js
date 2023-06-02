const repeatBtns = document.querySelectorAll(".repeat-btn")
const images = document.querySelectorAll(".grid-item")
const nameInput = document.querySelector("#nameInput")
const infoInput = document.querySelector("#infoInput")
const acceptBtn = document.getElementById("acceptNote")
let timer

let isAcceptingBtn = true


const nazvyAktivit = [
  "Chodit po laně nad propastí",
  "Skákat na jedné noze",
  "Tančit jako žirafa",
  "Hledat poklad pod polštářem",
  "Šplhat na stromy",
  "Být za superhrdinu",
  "Plácnout se po čele",
  "Předstírat tanečníka",
  "Fotit selfie se zvířetem",
  "Dělat šťastnou tvář"
];

const popisyAktivit = [
  "Představ si, že chodíš po laně nad hlubokou propastí.",
  "Vyzkoušejte, jak dlouho dokážete skákat na jedné noze a udržet rovnováhu!",
  "Oblékni si dlouhý krk, udělej pár kroků a tancuj jako žirafa na tanečním parketu!",
  "Polož si polštář pod hlavu, zamysli se nad tím, jaké poklady se pod ním mohou skrývat, a začni hledat!",
  "Najdi si vhodný strom a zkus na něj vyšplhat, jako bys byl/la malý opice!",
  "Vyber si svého oblíbeného superhrdinu, převlékni se do jeho kostýmu a cíť se nesmírně silný/á a statečný/á!",
  "Když uděláš plácnutí po čele a řekneš 'Aha!', budeš vypadat jako zkušený detektiv při řešení zločinu!",
  "Udělej si několik tanečních pohybů, které připomínají profesionálního tanečníka. Buď kreativní!",
  "Vyraz do zoo nebo do knihovny a vyfotografovuj selfie s nějakým zvířetem nebo knihou. Uvidíš, jak to bude vypadat!",
  "Zkus dělat šťastnou tvář, i když tě momentálně nic nebaví. Možná to nakonec změní tvou náladu!"
];

function generateRandomActivity() {
  let randInt = Math.floor(Math.random() * nazvyAktivit.length)
  return { name: nazvyAktivit[randInt], info: popisyAktivit[randInt] }
}

window.onload = main

function main() {
  let { name, info } = generateRandomActivity()
  nameInput.placeholder = name
  infoInput.placeholder = info
}


repeatBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelector(".btnSelected").classList.remove("btnSelected")
    btn.classList.add("btnSelected")
  })
})

images.forEach(image => {
  image.addEventListener("click", e => {
    document.querySelector(".imgSelected").classList.remove("imgSelected")
    image.children[0].classList.add("imgSelected")
  })
})
acceptBtn.addEventListener("click", e => {
  const selectedImage = document.querySelector(".imgSelected");
  const selectedButton = document.querySelector(".btnSelected");
  if (!isAcceptingBtn) {
    window.location.href = "../index.html";
    return
  }
  if (nameInput.value.trim() === "") {
    nameInput.style.borderColor = "red";
    return;
  }
  // Handle the case when no image is selected
  if (!selectedImage || !selectedImage.src || !selectedButton) {
    console.log("This should never happen. Error from not setting the image")
    console.log("Image: " + selectedImage)
    return;
  }
  // Save the note
  let note = {
    name: nameInput.value,
    info: infoInput.value,
    daily: selectedButton.textContent !== "Jednou" ? true : false,
    icon: selectedImage.src,
    date: new Date()
  }

  console.log(note)
  let savedItems = window.localStorage.getItem("todoNotes") || "[]"
  savedItems = JSON.parse(savedItems)
  savedItems.push(note)
  window.localStorage.setItem("todoNotes", JSON.stringify(savedItems))
  window.location.href = "../index.html";
})

acceptBtn.addEventListener('touchstart', () => {
  timer = setTimeout(() => {
    if (isAcceptingBtn) {
      acceptBtn.textContent = "✖"
      acceptBtn.style.backgroundColor = "#DF6582"
      isAcceptingBtn = false
    } else {
      acceptBtn.textContent = "✅"
      acceptBtn.style.backgroundColor = "#32DA7C"
      isAcceptingBtn = true
    }
  }, HOLD_INTERVAL);
});
acceptBtn.addEventListener('touchend', () => {
  clearTimeout(timer);
});