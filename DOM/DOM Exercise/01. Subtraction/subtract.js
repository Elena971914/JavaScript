function subtract() {
    const first = document.getElementById("firstNumber")
    const second = document.getElementById("secondNumber")

    first.disabled = false
    second.disabled = false

    const resultNumber = Number(first.value) - Number(second.value)

    document.getElementById('result').textContent = resultNumber
    
}

// window is global object like document, but has access to global APIs