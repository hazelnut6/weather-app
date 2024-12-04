const form = document.querySelector('#form');
const inputBar = document.querySelector('#inputBar');
const weatherDiv = document.querySelector('#weatherDiv');
const apiKey = 'YJCQ5HRJQ4AHMFTA9DJLKPD3K';

// Form event listener
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityName = inputBar.value;
    if(cityName) {
        try{
            const data = await weatherData(cityName);
            displayData(data);
        } catch(error) {
            console.log(error)
            // display error
        }
    } else {
        // display error
    }
});

// Fetch data
async function weatherData(cityName) {
    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${apiKey}`;
    const response = await fetch(weatherUrl, {mode: 'cors'});

    if(!response.ok) {
        throw new Error('Could not find')
    }
    
    return await response.json();
}

// Display data
function displayData(data) {

    // Data destructuring
    const {address: city, currentConditions: {humidity, icon, temp}, description: description} = data;

    // Display
    weatherDiv.textContent = "";
    weatherDiv.style.visibility = "visible";

    // Icon div
    const weatherIcon = document.createElement('div');
    weatherIcon.classList.add('weatherIcon');
    weatherDiv.appendChild(weatherIcon);

    // Icon

    // Temp div
    const weatherTemp = document.createElement('div');
    weatherTemp.classList.add('weatherTemp');
    weatherDiv.appendChild(weatherTemp);

    // Temperature
    const tempF = temp;
    const tempC = ((tempF - 32) * 5/9).toFixed(1);
    const tempDegree = document.createElement('p');
    tempDegree.classList.add('tempDegree');
    tempDegree.textContent = `${tempC}°C`;
    weatherTemp.appendChild(tempDegree);

    // Details div
    const weatherDetails = document.createElement('div');
    weatherDetails.classList.add('weatherDetails');
    weatherDiv.appendChild(weatherDetails);

    // City
    const weatherCity = document.createElement('p');
    weatherCity.classList.add('weatherCity');
    weatherCity.textContent = city;
    weatherDetails.appendChild(weatherCity);

    // Humidity
    const weatherHumidity = document.createElement('p');
    weatherHumidity.classList.add('weatherHumidity');
    weatherHumidity.textContent = `${humidity}% humidity`;
    weatherDetails.appendChild(weatherHumidity);
    
    // Description
    const weatherDesc = document.createElement('p');
    weatherDesc.classList.add('weatherDesc');
    weatherDesc.textContent = description;
    weatherDetails.appendChild(weatherDesc);
}

// Display error


