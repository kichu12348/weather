//dom variables

const form = document.querySelector('form');
const input = document.querySelector('#search');
const temp = document.querySelector('#temp');
const desc = document.querySelector('#desc');
const wind = document.querySelector('#windSpeed');
const humid = document.querySelector('#humid');
const cityName = document.querySelector('h1');
const disp = document.querySelector('#noItems');

// see if the user has submitted the form

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = input.value.toLowerCase();

    // check if the user has entered a city
    if (input.value === '') {
        errorDisplay('Please enter a city');
    }
    
    else {

        try{
        // waits for fetched the data from the API
        const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=8JGSDFCRK5Y49TKWB37ZNQR2K`).then(response => response.json());
       
        // update data in the DOM from the API
        temp.textContent = data.days[0].temp + '°C';
        desc.textContent = data.days[0].conditions;
        wind.textContent = data.days[0].windspeed + ' km/h';
        cityName.textContent = data.resolvedAddress;
        humid.textContent ='humidity: '+ data.days[0].humidity + '%';
        if(disp.id !== 'items'){
            disp.id = 'items'
        };
        input.value = '';
        }

        catch(err){
            errorDisplay('Location not found');
        }

    };
}
);

// function to display error message if caught

function errorDisplay(message) {
    if(disp.id !== 'items'){
         disp.id = 'items'
      }
    cityName.textContent = message;
    temp.textContent = '';
    desc.textContent = '';
    wind.textContent = '';
    humid.textContent = '';
    input.value = '';
}
