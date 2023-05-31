const btns = document.querySelectorAll(".repeat-btn")
const images = document.querySelectorAll(".grid-item")
const nameInput = document.querySelector("#nameInput")
const infoInput = document.querySelector("#infoInput")

btns.forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelector(".selected").classList.remove("selected")
    btn.classList.add("selected")
  })
})

images.forEach(image => {
  image.addEventListener("click", e => {
    document.querySelector(".imgSelected").classList.remove("imgSelected")
    image.children[0].classList.add("imgSelected")
  })
})

// Array s názvy aktivit
const nazvyAktivit = [
  "Chodit po laně nad propastí",
  "Skákat na jedné noze",
  "Tančit jako žirafa",
  "Hledat poklad pod polštářem",
  "Šplhat na stromy",
  "Být za superhrdinu",
  "Plácnout se po čele",
  "Předstírat, že tanečníka",
  "Fotit selfie se zvířetem",
  "Dělat šťastnou tvář"
];

// Array s popisy aktivit
const popisyAktivit = [
  "Představ si, že chodíš po laně nad hlubokou propastí. Budeš potřebovat hodně odvahy!",
  "Vyzkoušejte, jak dlouho dokážete skákat na jedné noze a udržet rovnováhu!",
  "Oblékni si dlouhý krk, udělej pár kroků a tancuj jako žirafa na tanečním parketu!",
  "Polož si polštář pod hlavu, zamysli se nad tím, jaké poklady se pod ním mohou skrývat, a začni hledat!",
  "Najdi si vhodný strom a zkuste se na něj vyšplhat, jako bys byl/la malý opice!",
  "Vyber si svého oblíbeného superhrdinu, převlékni se do jeho kostýmu a cítit se nesmírně silný/á a statečný/á!",
  "Když uděláš plácnutí po čele a řekneš 'Aha!', budeš vypadat jako zkušený detektiv při řešení zločinu!",
  "Udělej si několik tanečních pohybů, které připomínají profesionálního tanečníka. Buď kreativní!",
  "Vyraz do zoo nebo do knihovny a vyfotografovat selfie s nějakým zvířetem nebo knihou. Uvidíš, jak to bude vypadat!",
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