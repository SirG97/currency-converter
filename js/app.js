const currencies_url = 'https://free.currencyconverterapi.com/api/v5/currencies';
fetch(currencies_url).then(response =>{
        if(response.status !== 200){
            console.log("something is wron with the request"+ response.status);
            return;
        }
        response.json().then(currencies =>{
            console.log(currencies);
             let currencyFrom = document.getElementById('currency-from');
             let currencyTo = document.getElementById('currency-to');
            for (const currency in currencies) {
                for (const id in currencies[currency]) {
                  currencyFrom.innerHTML += `<option value="${currencies[currency][id].id}"> ${currencies[currency][id].id} - ${currencies[currency][id].currencyName}`;
                  currencyTo.innerHTML += `<option value="${currencies[currency][id].id}"> ${currencies[currency][id].id} - ${currencies[currency][id].currencyName}`;
                }

            }

        })
    }).catch(function(err){
        console.log(err);
    });

    //get the amount and selected currency and store in a variable
    //call the convert currency function with it


    //function to convert the currencyTo
    let convertCurrency = (amount, convertFrom, convertTo) => {
      const query = `${convertFrom}_${convertTo}`;
      const exchangeRateUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
      console.log(exchangeRateUrl);
      fetch(exchangeRateUrl).then(
        response => response.json()).then(exchangeRates => {
    
          for (const exchangeRate in exchangeRates) {
              if (exchangeRates.hasOwnProperty(`${query}`)) {
                  const rate = exchangeRates[exchangeRate];
                  console.log(rate);
                  amount = rate * amount;
                  let output = amount.toFixed(2);
                  document.getElementById('output').innerHTML = `${output} ${convertTo}`;
                  convertButton.innerHTML = 'Convert';
                  convertButton.disabled = false;
              }
          }

        

        }).catch(error =>
            console.log('Something is wrong with this api call')
        );
    }

    let convertButton = document.getElementById('convert');
    convertButton.addEventListener('click',() => {
        convertButton.innerHTML = 'Converting....';
        convertButton.disabled = true;
        let amount = document.getElementById('amount').value;
        let convertFrom = document.getElementById('currency-from').value;
        let convertTo = document.getElementById('currency-to').value;
        convertCurrency(amount, convertFrom, convertTo);
        console.log('I\'ve been clicked');
      });
