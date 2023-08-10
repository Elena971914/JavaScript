function attachEvents() {
    const loadBtn = document.getElementById('btnLoad')
    loadBtn.addEventListener('click', load)

    const createBtn = document.getElementById('btnCreate')
    createBtn.addEventListener('click', create)
    let phoneBook2 = ''

    async function load () {
        const phoneBook = await(await fetch('http://localhost:3030/jsonstore/phonebook')).json()
        phoneBook2 = phoneBook
        document.getElementById('phonebook').innerHTML = ''

        for (let {person, phone, _id} of Object.values(phoneBook)) {
            const li = document.createElement('li')
            li.textContent = `${person}: ${phone}`
            const button = document.createElement('button')
            button.textContent = 'Delete'
            button.id = _id
            button.addEventListener('click', deletePhone)
            li.appendChild(button)
            document.getElementById('phonebook').appendChild(li)
            
        }
    }

    function create() {
        const person = document.getElementById('person').value
        const phone = document.getElementById('phone').value
        document.getElementById('person').textContent = ''
        document.getElementById('phone').textContent = ''
        fetch('http://localhost:3030/jsonstore/phonebook', {method: 'POST', body: JSON.stringify({ person, phone })})
        load()
    }

    async function deletePhone() {
        const id = this.id
        fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {method: 'DELETE'})
        load()
    }
 
}

attachEvents();