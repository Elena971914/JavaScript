window.addEventListener("load", solve)

function solve() {
  const previewList = document.getElementById('preview-list')
  const publishBtn = document.getElementById('form-btn')
  publishBtn.addEventListener('click', publish)
  const saveBtn = document.createElement('button')
  const editBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')
  let data = {}

  function publish() {
    previewList.innerHTML = ''
    const firstName = document.getElementById('first-name').value
    const lastName = document.getElementById('last-name').value
    const age = document.getElementById('age').value
    const title = document.getElementById('story-title').value
    const genre = document.getElementById('genre').value
    const description = document.getElementById('story').value

    if (!firstName || !lastName || !title || !genre || !description || !age) {
      return
    }

    data = { firstName, lastName, title, genre, description, age }

    previewList.innerHTML += `<li class="story-info"> 
    <article>
      <h4>Name: ${firstName} ${lastName}</h4>
      <p>Age: ${age}</p>
      <p>Title: ${title}</p>
      <p>Genre: ${genre}</p> 
      <p>${description}</p>
      </article>
      </li>`

    saveBtn.textContent = 'Save Story'
    editBtn.textContent = 'Edit Story'
    deleteBtn.textContent = 'Delete Story'
    saveBtn.classList.add('save-btn')
    editBtn.classList.add('edit-btn')
    deleteBtn.classList.add('delete-btn')
    document.getElementsByClassName('story-info')[0].appendChild(saveBtn)
    document.getElementsByClassName('story-info')[0].appendChild(editBtn)
    document.getElementsByClassName('story-info')[0].appendChild(deleteBtn)

    editBtn.addEventListener('click', edit)
    saveBtn.addEventListener('click', save)
    deleteBtn.addEventListener('click', deleteStory)

    publishBtn.disabled = true
    document.getElementById('first-name').value = ''
    document.getElementById('last-name').value = ''
    document.getElementById('age').value = ''
    document.getElementById('story-title').value = ''
    document.getElementById('genre').value = ''
    document.getElementById('story').value = ''
  }

  function edit() {
    previewList.innerHTML = '<h3>Preview</h3>'
    document.getElementById('first-name').value = data.firstName
    document.getElementById('last-name').value = data.lastName
    document.getElementById('age').value = data.age
    document.getElementById('story-title').value = data.title
    document.getElementById('genre').value = data.genre
    document.getElementById('story').value = data.description

    publishBtn.disabled = false
    editBtn.disabled = true
    saveBtn.disabled = true
    deleteBtn.disabled = true
  }

  function save() {
    document.getElementById('main').innerHTML = '<h1>Your scary story is saved!</h1>'
  }

  function deleteStory() {
    previewList.innerHTML = '<h3>Preview</h3>'
    publishBtn.disabled = false
  }
}
