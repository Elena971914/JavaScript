function calc() {
    const number1 = document.getElementById('num1')
    const number2 = document.getElementById('num2')
    const sum = Number(number1.value) + Number(number2.value)
    document.getElementById('sum').value = sum
}
