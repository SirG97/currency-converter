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
      const exchangeRate = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
      console.log(exchangeRate);
      fetch(exchangeRate).then(
        response => response.json()).then(convert => {
          let convertionRate = `convert.${query}`;
          console.log(conversionRate);

          amount = `${conversionRate * amount} ${convertTo}`;
          document.getElementById('output').innerHTML = amount

        }).catch(error =>
            console.log('Something is wrong with this api call')
        );
    }

    let convertButton = document.getElementById('convert');
    convertButton.addEventListener('click',() => {
        let amount = document.getElementById('amount').value;
        let convertFrom = document.getElementById('currency-from').value;
        let convertTo = document.getElementById('currency-to').value;
        convertCurrency(amount, convertFrom, convertTo);
        console.log('I\'ve been converted');
      });
