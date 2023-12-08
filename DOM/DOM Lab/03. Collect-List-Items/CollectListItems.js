function extractText() {
    const list = document.querySelectorAll("ul#items li")
    const res = document.getElementById('result')

    for (let li of list) {
        res.textContent += li.textContent + "\n"
    }
}