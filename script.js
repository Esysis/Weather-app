const apiKey = '58a7e01273b0a1fe7ba165b08a00ca26'

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2); 
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const city = document.querySelector('#city-input').value;
  getCoordinates(city);
});

function getCoordinates(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => getForecast(data.coord.lat, data.coord.lon));
}

function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.querySelector('#current-weather').innerHTML = `
        <h2>${data.city.name} (${new Date().toLocaleDateString()})</h2>
        <p>Temperature: ${kelvinToFahrenheit(data.list[0].main.temp)}°F</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Wind Speed: ${data.list[0].wind.speed} MPH</p>
      `;

    });
}
