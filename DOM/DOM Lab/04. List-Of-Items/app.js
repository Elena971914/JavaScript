function addItem() {
    const inputText = document.getElementById("newItemText").value
    const newLi = document.createElement('li')
    newLi.innerHTML = inputText
    document.querySelector('ul').appendChild(newLi)
    document.getElementById("newItemText").value = ''
}