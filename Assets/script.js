const apiKey = '58a7e01273b0a1fe7ba165b08a00ca26'

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

searchHistory.forEach(city => addCityToSearchHistory(city));


function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2); 
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const city = document.querySelector('#city-input').value;
  addCityToSearchHistory(city);
  getCoordinates(city);
});

function addCityToSearchHistory(city) {
    if (!searchHistory.includes(city)) {
      searchHistory.push(city);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    
    const searchHistoryContainer = document.querySelector('#search-history');
    searchHistoryContainer.innerHTML = '';
    searchHistory.forEach(city => {
      const cityDiv = document.createElement('div');
      cityDiv.textContent = city;
      cityDiv.addEventListener('click', () => getCoordinates(city));
      searchHistoryContainer.append(cityDiv);
    });
  }

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
        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="Weather icon">
        <p>Temperature: ${kelvinToFahrenheit(data.list[0].main.temp)}°F</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Wind Speed: ${data.list[0].wind.speed} MPH</p>
      `;

      const forecastContainer = document.querySelector('#forecast-container');
      forecastContainer.innerHTML = '';
      
      for (let i = 0; i < 5; i++) {
        forecastContainer.innerHTML += `
          <div>
            <h3>${new Date(data.list[i*8].dt * 1000).toLocaleDateString()}</h3>
            <img src="https://openweathermap.org/img/wn/${data.list[i*8].weather[0].icon}@2x.png" alt="Weather icon">
            <p>Temperature: ${kelvinToFahrenheit(data.list[i*8].main.temp)}°F</p>
            <p>Humidity: ${data.list[i*8].main.humidity}%</p>
            <p>Wind Speed: ${data.list[i*8].wind.speed} MPH</p>
          </div>
        `;
      }
    });
}
