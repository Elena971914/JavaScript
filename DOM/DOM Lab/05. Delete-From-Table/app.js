function deleteByEmail() {
    //we take the element that should be deleted
    const email = document.querySelector('input[name="email"]').value
    //get all even table boxes and convert them to array
    const emailBoxes = Array.from(document.querySelectorAll("td:nth-child(even)"))

    const userEmailBox = emailBoxes.find(box => box.textContent === email)

    const result = document.querySelector('#result');
    //delete the whole row
    if (userEmailBox) {
        userEmailBox.parentElement.remove()
        result.textContent = 'Deleted.'
    }
    else {
        result.textContent = 'Not found.'
    }
}