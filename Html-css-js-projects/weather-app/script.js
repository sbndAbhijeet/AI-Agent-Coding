
async function getWeather(city) {
 const apiKey = '87450335756d73487abbd35cc01ae233'; // Replace with process.env.WEATHER_API_KEY in a real setup
 const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
 const data = await response.json();
 return data;
}

document.getElementById('fetch-button').addEventListener('click', async () => {
 const city = document.getElementById('city-input').value;
 if (!city) return;
 const resultDiv = document.getElementById('weather-result');
 resultDiv.textContent = 'Loading...';
 try {
 const weatherData = await getWeather(city);
 if (weatherData.cod === 200) {
 resultDiv.innerHTML = `
 <h2>${weatherData.name}</h2>
 <p>Temperature: ${weatherData.main.temp} °C</p>
 <p>Weather: ${weatherData.weather[0].description}</p>
 `;
 } else {
 resultDiv.textContent = 'City not found.';
 }
 } catch (err) {
 resultDiv.textContent = 'Error fetching weather.';
 }
});
