// Select DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

// Convert function
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        result.textContent = 'Please enter a valid amount 💡';
        return;
    }

    try {
        // Fetch exchange rate from API
        const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await response.json();

        if (data.result !== undefined) {
            result.textContent = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
        } else {
            result.textContent = 'Conversion failed 😔';
        }
    } catch (error) {
        result.textContent = 'Error fetching exchange rate ⚠️';
        console.error(error);
    }
}

// Event listener
convertBtn.addEventListener('click', convertCurrency);