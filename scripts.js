// Elementos HTML
const form = document.querySelector("form")
const newItemInput = document.querySelector("#newItemInput")
const buyList = document.querySelector('#buyList')
const footer = document.getElementsByTagName("footer")[0]
const closeNoticeBtn = document.querySelector(".closeNoticeBtn")

const initialItems = ["Pão de forma", "Café preto", "Suco de laranja", "Bolachas"]
initialItems.forEach(item => addNewItem(item))

form.onsubmit = (event) => {
    event.preventDefault()

    if (newItemInput.value.trim() == "") alert("Por favor, digite um item antes de tentar adicionar.")
    else addNewItem(newItemInput.value.trim())
}

function addNewItem(item) {
    const newItemHTML = createListItem(item)
    buyList.appendChild(newItemHTML)
    newItemInput.value = ""
}

function createListItem(itemName) {
    const listItem = document.createElement("li")
    listItem.classList.add("item")

    const button = document.createElement("button")

    button.addEventListener("click", () => {
        removeListItem(listItem)
    })

    const div = document.createElement("div")

    const id = `item-${Math.random().toString(36).slice(2)}`

    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.setAttribute("id", id)
    input.classList.add("checkbox")

    const label = document.createElement("label")
    label.setAttribute("for", id)
    label.classList.add("text-paragraph")
    label.innerText = itemName

    input.addEventListener("change", (event) => {
        label.classList.toggle("item-checked", event.target.checked)
    })

    button.setAttribute("type", "button")
    button.classList.add("removeItem")
    const img = document.createElement("img")
    img.setAttribute("src", "assets/delete-icon.svg")
    img.setAttribute("alt", "Deletar Item")
    button.appendChild(img)

    div.append(input, label)
    listItem.append(div, button)

    return listItem
}

let hideNoticeTimeout

function removeListItem(itemToBeRemoved) {
    buyList.removeChild(itemToBeRemoved)
    footer.classList.add('visible')

    clearTimeout(hideNoticeTimeout)
    hideNoticeTimeout = setTimeout(() => {
        footer.classList.remove("visible")
    }, 3000)
}

closeNoticeBtn.addEventListener("click", () => {
    footer.classList.remove("visible")
})