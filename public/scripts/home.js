const searchButton = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const x = document.querySelector("#modal .content .header a")

searchButton.addEventListener("click", () => {
    modal.classList.remove("hide")
})
x.addEventListener("click", () => {
    modal.classList.add("hide")
})
