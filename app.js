//dom variables
const form = document.querySelector('form');
const input = document.querySelector('#search');
const temp = document.querySelector('#temp');
const desc = document.querySelector('#desc');
const wind = document.querySelector('#windSpeed');
const humid = document.querySelector('#humid');
const cityName = document.querySelector('h1');
const disp = document.querySelector('#noItems');
const time = document.querySelector('#times');

// check if the user has submitted the form

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = input.value.toLowerCase();

    // check if the user has entered a city or left blank
    if (input.value === '') {
        errorDisplay('Please enter a city');
    }
    
    else {

        try{

            // waits for fetched the data from the API
            const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=8JGSDFCRK5Y49TKWB37ZNQR2K`).then(response => response.json());
       
            // update data in the DOM from the API
            temp.textContent = Math.floor(data.days[0].temp) + '°C';
            desc.textContent = data.days[0].conditions;
            wind.textContent = 'windspeed: '+ Math.floor(data.days[0].windspeed) + ' km/h';
            cityName.textContent = data.resolvedAddress;
            humid.textContent ='humidity: '+ Math.floor(data.days[0].humidity) + '%';
            
            //time from the API  
            try{
                const timezone = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=33LL1JYYHQSY&format=json&by=zone&zone=${data.timezone}`).then(responseT => responseT.json()).then(dataT => dataT.formatted.split(' ')[1].split(':'));
                //adds time to dom
                time.textContent = 'Local Time: ' + timezone[0].toString().padStart(2,'0')+ ':' + timezone[1].toString().padStart(2,'0');

            }
            catch(err){
                console.log(err +"you are gaeeeeeeeeee");

            }

            if(disp.id !== 'items') {

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

    if(disp.id !== 'items') {

        disp.id = 'items'

    }

    cityName.textContent = message;
    temp.textContent = '';
    desc.textContent = '';
    wind.textContent = '';
    humid.textContent = '';
    input.value = '';
    time.textContent = '';

}
