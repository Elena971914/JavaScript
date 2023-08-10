function attachEvents() {
  const loadBtn = document.getElementById('loadBooks').addEventListener('click', load)
  const createBtn = document.querySelector('#form button')
  createBtn.addEventListener('click', create)
  const tbody = document.querySelector('table>tbody')
  let allBooksData = {}
  let editBookId = null

  async function load() {
    tbody.innerHTML = ''
    const allBooks = await (await fetch('http://localhost:3030/jsonstore/collections/books')).json()
    allBooksData = allBooks

    for (let id of Object.keys(allBooks)) {
      const { title, author } = allBooks[id]

      const newRow = document.createElement('tr')
      const td1 = document.createElement('td')
      td1.textContent = title
      const td2 = document.createElement('td')
      td2.textContent = author

      const td3 = document.createElement('td')

      const editBtn = document.createElement('button')
      editBtn.textContent = 'Edit'
      editBtn.id = id
      editBtn.addEventListener('click', loadEditForm)

      const deleteBtn = document.createElement('button')
      deleteBtn.addEventListener('click', deleteBook)
      deleteBtn.textContent = 'Delete'
      td3.appendChild(editBtn)
      td3.appendChild(deleteBtn)
      deleteBtn.id = id

      document.querySelector('tbody').appendChild(newRow)
      newRow.appendChild(td1)
      newRow.appendChild(td2)
      newRow.appendChild(td3)
    }
  }

  async function loadEditForm() {
    const id = this.id
    const bookById = allBooksData[this.id]
    document.querySelector('#form h3').textContent = 'edit FORM'
        document.querySelector('input[name=title]').value = bookById.title
        document.querySelector('input[name=author]').value = bookById.author
        editBookId = id
        createBtn.textContent = 'Save'
  }
  async function create() {
    const title = document.querySelector('input[name=title]').value
    const author = document.querySelector('input[name=author]').value

    if (!title || !author) {
      return
    }

    if (createBtn.textContent === 'Submit') {
      await fetch('http://localhost:3030/jsonstore/collections/books', 
      { method: 'POST', body: JSON.stringify({ author, title }) }
      )
    }
    else if (createBtn.textContent === 'Save') {

      await fetch(`http://localhost:3030/jsonstore/collections/books/${editBookId}`, 
      {method: 'PUT', body: JSON.stringify({ author, title }) })
      createBtn.textContent = 'Submit'
      document.querySelector('#form h3').textContent = 'FORM'
    }
    document.querySelector('input[name=title]').value = ''
    document.querySelector('input[name=author]').value = ''
    load()
  }

  async function deleteBook() {
    const id = this.id
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {method:'DELETE'})
    load()
  }
}

attachEvents();