function attachEvents() {
  const submitBtn = document.getElementById('submit')
  submitBtn.addEventListener('click', submit)
  const table = document.querySelector('#results tbody')

  async function submit() {
    table.innerHTML = ''
    const firstName = document.querySelector('input[name="firstName"]').value
    const lastName = document.querySelector('input[name="lastName"]').value
    const facultyNumber = document.querySelector('input[name="facultyNumber"]').value
    const grade = document.querySelector('input[name="grade"]').value

    if (!firstName || !lastName || !facultyNumber || !grade) {
      document.querySelector('.notification').textContent = 'Error!'
      return
    }
    const headers = {firstName, lastName, facultyNumber, grade}
    
    fetch('http://localhost:3030/jsonstore/collections/students', {method:'POST', body:JSON.stringify(headers)}).catch((error) => console.error(error.message))

    try{
    const records = await( await fetch('http://localhost:3030/jsonstore/collections/students')).json()
    

    for (let {firstName, lastName, facultyNumber, grade} of Object.values(records)) {
      const tr = document.createElement('tr')
      const td1 = document.createElement('td')
      td1.textContent = firstName
      const td2 = document.createElement('td')
      td2.textContent = lastName
      const td3 = document.createElement('td')
      td3.textContent = facultyNumber
      const td4 = document.createElement('td')
      td4.textContent = grade
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      
      table.appendChild(tr)

    document.querySelector('input[name="firstName"]').textContent = ''
    document.querySelector('input[name="lastName"]').textContent = ''
    document.querySelector('input[name="facultyNumber"]').textContent = ''
    document.querySelector('input[name="grade"]').textContent = ''
    }
  }
  catch {(error) => console.error(error.message)}
}}

attachEvents();