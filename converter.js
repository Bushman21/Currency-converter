// Select DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

// Convert function
async function convertCurrency() {

    const amount = parseFloat(amountInput.value.trim());
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Validation
    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Enter a valid positive number 💡";
        return;
    }

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();

        if (data.result === "success") {

            const rate = data.rates[to];

            if (!rate) {
                result.textContent = "Invalid currency selection 😔";
                return;
            }

            const converted = amount * rate;

            result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

        } else {
            result.textContent = "Conversion failed 😔";
        }

    } catch (error) {
        result.textContent = "Network error ⚠️";
        console.error(error);
    }
}

// Add event listener
convertBtn.addEventListener("click", convertCurrency);