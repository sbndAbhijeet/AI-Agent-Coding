async function getWeather(city) {
    const apiKey = '87450335756d73487abbd35cc01ae233'; // Replace with your API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

function getWeatherEmoji(weatherCondition) {
    switch (weatherCondition) {
        case 'Thunderstorm': return '⛈️';
        case 'Drizzle': return '🌧️';
        case 'Rain': return '🌧️';
        case 'Snow': return '❄️';
        case 'Clear': return '☀️';
        case 'Clouds': return '☁️';
        default: return '☀️';
    }
}

document.getElementById('fetch-button').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) return;

    const resultDiv = document.getElementById('weather-result');
    resultDiv.classList.remove('show');
    resultDiv.textContent = 'Loading...';

    try {
        const weatherData = await getWeather(city);
        if (weatherData.cod === 200) {
            const weather = weatherData.weather[0].main;
            const emoji = getWeatherEmoji(weather);
            resultDiv.innerHTML = `
                <h2>${weatherData.name}</h2>
                <p><span class="weather-symbol">${emoji}</span>Temperature: ${weatherData.main.temp} °C</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
            `;
            resultDiv.classList.add('show');
        } else {
            resultDiv.textContent = 'City not found.';
            resultDiv.classList.add('show');
        }
    } catch (err) {
        resultDiv.textContent = 'Error fetching weather.';
        resultDiv.classList.add('show');
    }
});