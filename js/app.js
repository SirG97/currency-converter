const currencies_url = 'https://free.currencyconverterapi.com/api/v5/currencies';
fetch(currencies_url)
    .then(response =>{
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
                  currencyFrom.innerHTML += '<option value="' + currencies[currency][id].id + '"> ' + currencies[currency][id].id + ' - ' + currencies[currency][id].currencyName;
                  currencyTo.innerHTML += '<option value="' + currencies[currency][id].id + '"> ' + currencies[currency][id].id + ' - ' + currencies[currency][id].currencyName;

                    console.log(currencies[currency][id].id);
                   console.log(currencies[currency][id].currencyName);
                }

            }

        })
    }).catch(function(err){
        console.log(err);
    });

    //get the amount and selected currency and store in a variable
    //call the convert currency function with it

    //function to convert the currencyTo
    function convertCurrency(){

    }
