// TODO
function attachEvents() {
    const loadBtn = document.getElementById('load-button')
    const addBtn = document.getElementById('add-button')
    const list = document.getElementById('todo-list')

    loadBtn.addEventListener('click', loadData)
    addBtn.addEventListener('click', addTask)

    async function loadData(e) {
        if (e) { e.preventDefault() }

        list.innerHTML = ''

        let data = {}
        try {
        data = await (await fetch('http://localhost:3030/jsonstore/tasks/')).json()}
        catch(err) {console.log(err)  
             return }

        for (const task of Object.values(data)) {
            const li = document.createElement('li')
            li.id = task._id
            const span = document.createElement('span')
            span.textContent = task.name
            let removeBtn = document.createElement('button')
            let editBtn = document.createElement('button')
            removeBtn.textContent = 'Remove'
            editBtn.textContent = 'Edit'
            removeBtn.addEventListener('click', removeTask)
            editBtn.addEventListener('click', editTask)

            list.appendChild(li)
            li.appendChild(span)
            li.appendChild(removeBtn)
            li.appendChild(editBtn)
        }
    }
    async function addTask(e) {
        e.preventDefault()

        const name = document.getElementById('title').value
        try {
            await fetch('http://localhost:3030/jsonstore/tasks/',
                { method: "POST", body: JSON.stringify({ name }) })
        } catch (err) {
            console.log(err)
            return
        }
        document.getElementById('title').value = ''
        loadData()
    }

    async function removeTask(e) {
        const id = e.currentTarget.parentNode.id
        try {
            await fetch(`http://localhost:3030/jsonstore/tasks/${id}`,
                { method: "DELETE" })
        }
        catch (err) {
            console.log(err)
            return
        }
        loadData()
    }

    async function editTask(e) {
        const liParent = e.currentTarget.parentNode
        const [span,rem,ed] = Array.from(liParent.children)
        const editInput = document.createElement('input')
        editInput.value = span.textContent
        liParent.prepend(editInput)
        const submitBtn = document.createElement('button')
        submitBtn.textContent = 'Submit'
        submitBtn.addEventListener('click', submitEdit)
        liParent.appendChild(submitBtn)
        span.remove()
        ed.remove()
    }

    async function submitEdit(e) {
        const liParent = e.currentTarget.parentNode
        const id = e.currentTarget.parentNode.id
        const [input] = Array.from(liParent.children)
        try{
        await fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {method: 'PATCH', body:JSON.stringify({ name: input.value})})}
        catch(err){
            console.log(err)
            return
        }
        loadData()
}
}
attachEvents()
