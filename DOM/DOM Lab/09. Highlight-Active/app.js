function focused() {
    const inputs = Array.from(document.querySelectorAll('input'))

    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            // document.querySelectorAll('focused').remove()
            e.target.parentElement.className = 'focused'
        })
        input.addEventListener('blur', (e) => {
            e.target.parentElement.className = ""
        })
    })
}