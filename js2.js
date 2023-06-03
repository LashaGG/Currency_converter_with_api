
alert("The exchange rates of currencies obtained from the API may not be 100% accurate")


document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        convert();
    }
});

document.getElementById("convert-button").addEventListener("click", function () {
    convert();
});


let currencyRates = {};

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(response => response.json())
    .then(data => {
        const dv = data.Valute;

        currencyRates = {
            USD: (dv.USD.Value / dv.USD.Nominal),
            EUR: (dv.EUR.Value / dv.EUR.Nominal),
            GEL: (dv.GEL.Value / dv.GEL.Nominal),
            RUB: 1,
            TRY: (dv.TRY.Value / dv.TRY.Nominal),
            JPY: (dv.JPY.Value / dv.JPY.Nominal)
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });

function convert() {
    const currency = document.getElementById("currency-select").value;
    const amount = document.getElementById("amount-input").value;
    updateValues(currency, amount);
}

function updateValues(currency, amount) {
    const currencies = document.getElementsByClassName("output");
    Array.from(currencies).forEach(function (element) {
        element.textContent = getNumber(currency, element.id, amount);
    });
}

function getNumber(inpCur, outCur, amount) {
    if (inpCur === outCur) {
        return amount;
    }

    const inp = currencyRates[inpCur];
    const out = currencyRates[outCur];

    return ((inp / out) * amount).toFixed(3);
}
