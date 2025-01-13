const keywordInput = document.getElementById('keyword');
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const passwordField = document.getElementById('password');
const copyButton = document.getElementById('copy');
const strengthIndicator = document.getElementById('strength');

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

lengthInput.addEventListener('input', () => {
    lengthValue.textContent = lengthInput.value;
});

function evaluateStrength(password) {
    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) score++;

    if (score === 1) {
        strengthIndicator.textContent = "Strength: Weak";
        strengthIndicator.className = "strength weak";
    } else if (score === 2 || score === 3) {
        strengthIndicator.textContent = "Strength: Medium";
        strengthIndicator.className = "strength medium";
    } else if (score === 4 || score === 5) {
        strengthIndicator.textContent = "Strength: Strong";
        strengthIndicator.className = "strength strong";
    }
}

generateButton.addEventListener('click', () => {
    const keyword = keywordInput.value;
    const length = parseInt(lengthInput.value);

    if (length < keyword.length) {
        alert("Password length cannot be shorter than the keyword.");
        return;
    }

    if (
        !uppercaseCheckbox.checked &&
        !lowercaseCheckbox.checked &&
        !numbersCheckbox.checked &&
        !symbolsCheckbox.checked
    ) {
        alert("Please select at least one option (Uppercase, Lowercase, Numbers, or Special Characters).");
        return;
    }

    let characters = "";
    if (uppercaseCheckbox.checked) characters += uppercaseChars;
    if (lowercaseCheckbox.checked) characters += lowercaseChars;
    if (numbersCheckbox.checked) characters += numbers;
    if (symbolsCheckbox.checked) characters += symbols;

    let password = keyword;
    for (let i = keyword.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordField.value = password;
    evaluateStrength(password);
});

copyButton.addEventListener('click', () => {
    passwordField.select();
    document.execCommand('copy');
});