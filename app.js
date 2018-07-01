//Register your service worker as early as possible
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/currency-converter/sw.js', {scope: '/currency-converter/'})
        .then(function(reg) {
            if(reg.installing) {
                console.log('Service worker installing for the first time...');
                
                const dbPromise = idb.open('currency-list', 1, upgradeDB => {
                    upgradeDB.createObjectStore('currencies', { keyPath: 'currencyName' });
                    upgradeDB.createObjectStore('exchange_rates', { keyPath: 'pair' });
                });
                const currencies_url = 'https://free.currencyconverterapi.com/api/v5/currencies';
                fetch(currencies_url).then(response =>{
                    if(response.status !== 200){
                        console.log("something is wron with the request"+ response.status);
                        return;
                    }
                    response.json().then(currencies =>{
                        console.log(currencies);
                        listCurrencies(Object.values(currencies.results));
                        dbPromise.then(dbObj => {
                            const tx = dbObj.transaction('currencies', 'readwrite');
                            Object.values(currencies.results).map( currency => {
                                tx.objectStore('currencies').put(currency);
                            });
                        });
               
            
                    })
                }).catch(function(err){
                    console.log(err);
                }); 

              } else if(reg.waiting) {
                 // If there's a waiting worker, bypass network Fetch currency list from IndexedDB
                console.log('Service worker installed');
                return dbPromise.then(db => {
                    return db.transaction('currencies').objectStore('currencies').getAll();
                    
                })
                .then(allCurrencies => {
                    listCurrencies(allCurrencies);
                    return allCurrencies;
                });

              } else if(reg.active) {
                console.log('Service worker active');

              }
        }).catch(function(error) {
          // registration failed
          console.log('Registration failed with ' + error);
        });
      }


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


let listCurrencies = (currencies) => {
    const sortedCurrencies = Array.from(currencies).sort((prev, next) => {
        if(prev.currencyName < next.currencyName){
            return -1;
        }else if(prev.currencyName > next.currencyName){
            return 1;
        }else{
            return 0;
        }
    })

    //append to the select option in the DOM
    let currencyFrom = document.getElementById('currency-from');
    let currencyTo = document.getElementById('currency-to');

   return sortedCurrencies.map(currency => {
        currencyFrom.innerHTML += `<option value="${currency.id}"> ${currency.id} - ${currency.currencyName}`;
        currencyTo.innerHTML += `<option value="${currency.id}"> ${currency.id} - ${currency.currencyName}`;
    })
    

}