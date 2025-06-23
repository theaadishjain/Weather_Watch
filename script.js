// API key for OpenWeatherMap
const apiKey = 'api_key'; 

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');
const errorContainer = document.getElementById('error-container');

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Function to fetch and display weather data
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
        hideError();
    } catch (error) {
        showError('City not found. Please try again with a valid city name.');
        hideWeather();
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    
    weatherContainer.innerHTML = `
        <h2>${name}</h2>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="temperature">${Math.round(temp)}°C</p>
        <p class="description">${description}</p>
        <div class="details">
            <p class="humidity">Humidity: ${humidity}%</p>
        </div>
    `;
    
    weatherContainer.classList.add('active');
}

// Function to hide weather container
function hideWeather() {
    weatherContainer.classList.remove('active');
}

// Function to show error message
function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.add('active');
}

// Function to hide error message
function hideError() {
    errorContainer.classList.remove('active');
}