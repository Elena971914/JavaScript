function toggle() {
    const button = document.querySelector('span.button')
    const additionalText = document.querySelector('#extra')

    additionalText.style.display = additionalText.style.display === "none" ? 'block' : 'none'

    button.textContent = button.textContent === "More" ? 'Less' : 'More'
}