// Declare variables to store the current operation, the current and previous values, and the memory value
let currentOperation = null;
let currentValue = '';
let previousValue = '';
let memoryValue = 0;

// Function to reset the calculator to its default state
function resetCalculator() {
    currentValue = '';
    previousValue = '';
    currentOperation = null;
    memoryValue = 0;
    updateDisplay();
}

// Event handler to reset the calculator when the window loads
window.onload = function() {
    resetCalculator();
};

// Function to append a number to the current value
function appendNumber(number) {
    if (currentOperation !== null && currentValue !== '' && previousValue === '') {
        previousValue = currentValue;
        currentValue = '';
    }
    currentValue += number;
    updateDisplay();
}
// Function to set the current operation
function setOperation(operation) {
    if (currentValue === '') return;
    if (previousValue !== '') calculate();
    currentOperation = operation;
}
// Function to perform calculation based on the current operation
function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Division by zero is not allowed.");
                clearDisplay();
                return;
            } else {
                result = prev / current;
            }
            break;
        case 'sqrt':
            if (current < 0) {
                alert("Square root of negative number is not allowed.");
                clearDisplay();
                return;
            } else {
                result = Math.sqrt(current);
            }
            break;
        case 'pow':
            result = Math.pow(prev, current);
            break;
    }

    currentValue = result.toString();
    currentOperation = null;
    previousValue = '';
    updateDisplay();
}

// Function to recall the value stored in memory
function memoryRecall() {
    currentValue = memoryValue.toString();
    updateDisplay();
}
// Function to clear the memory value
function memoryClear() {
    memoryValue = 0;
}
// Function to add the current value to memory
function memoryAdd() {
    memoryValue += parseFloat(currentValue);
}
// Function to subtract the current value from memory
function memorySubtract() {
    memoryValue -= parseFloat(currentValue);
}
// Function to clear the current and previous values and reset the operation
function clearDisplay() {
    currentValue = '';
    previousValue = '';
    currentOperation = null;
    updateDisplay();
}
// Function to update the calculator display
function updateDisplay() {
    const displayValue = currentValue === '' ? '0' : currentValue;
    document.getElementById('display').value = displayValue;
}

