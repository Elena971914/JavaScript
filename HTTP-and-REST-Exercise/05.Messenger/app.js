function attachEvents() {
    const refreshBtn = document.getElementById('refresh')
    refreshBtn.addEventListener('click', refresh)

    async function refresh() {
        document.getElementById("messages").innerHTML = ''
        const messages = await(await fetch('http://localhost:3030/jsonstore/messenger')).json()

        let text = ''
        Object.values(messages).forEach(value => {
            text += `${value.author}: ${value.content}\n` })

        document.getElementById("messages").innerHTML += text.trim()
    }

    const sendBtn = document.getElementById('submit')
    sendBtn.addEventListener('click', send)

    async function send() {
        const author = document.querySelector('input[name="author"]').value
        const content = document.querySelector('input[name="content"]').value
        const newObj = {author, content}
        fetch('http://localhost:3030/jsonstore/messenger', {method: 'POST', body: JSON.stringify(newObj)})
        document.querySelector('input[name="author"]').value = ''
        document.querySelector('input[name="content"]').value = ''
    }
}

attachEvents();