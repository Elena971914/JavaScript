// TODO:
function attachEvents() {
    const loadBtn = document.getElementById('load-board-btn')
    loadBtn.addEventListener('click', load)
    const createBtn = document.getElementById('create-task-btn')
    createBtn.addEventListener('click', create)

    const columns = {
        'ToDo': document.querySelector('#todo-section .task-list'),
        'In Progress': document.querySelector('#in-progress-section .task-list'),
        'Code Review': document.querySelector('#code-review-section .task-list'),
        'Done': document.querySelector('#done-section .task-list'),
    }

    const buttonLabel = {
        'ToDo': 'Move to In Progress',
        'In Progress': "Move to Code Review",
        'Code Review': "Move to Done",
        'Done': "Close",
    }

    async function load() {
        const taskLists = Array.from(document.querySelectorAll('.task-list'))
        for (let taskList of taskLists) {
            taskList.innerHTML = ''
        }
        let data = {}
        try {
            data = await (await fetch('http://localhost:3030/jsonstore/tasks/')).json()
        }
        catch { error => console.log(error) }

        for (let object of Object.values(data)) {
            const parent = columns[object.status]
            const li = createElement('li', parent, '', ['task'], object._id)
            const fixBug = createElement('h3', li, object.title)
            const desc = createElement('p', li, object.description)
            const moveButton = createElement('button', li, buttonLabel[object.status])
            moveButton.addEventListener('click', move)
            }
        }

    async function create() {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value

        await fetch('http://localhost:3030/jsonstore/tasks/',
         {method: 'POST', body: JSON.stringify({ title, description, status: 'ToDo'})})

        load()
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''

    }

    async function move(e) {
        const id = this.parentNode.id
        if (this.textContent === "Close") {
            await fetch(`http://localhost:3030/jsonstore/tasks/${id}`,
                 {method: 'DELETE'})
        } else {
            const next = this.textContent.substring(8)
            await fetch(`http://localhost:3030/jsonstore/tasks/${id}`,
                 {method: 'PATCH', body: JSON.stringify({ status: next})})
        }
        load()
    }

    function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
        const htmlElement = document.createElement(type);

        if (content && useInnerHtml) {
            htmlElement.innerHTML = content;
        } else {
            if (content && type !== 'input') {
                htmlElement.textContent = content;
            }

            if (content && type === 'input') {
                htmlElement.value = content;
            }
        }

        if (classes && classes.length > 0) {
            htmlElement.classList.add(...classes);
        }

        if (id) {
            htmlElement.id = id;
        }

        // { src: 'link', href: 'http' }
        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key])
            }
        }

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }

        return htmlElement;
    }
}

attachEvents();