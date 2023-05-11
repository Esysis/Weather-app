const apiKey = '58a7e01273b0a1fe7ba165b08a00ca26'

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const city = document.querySelector('#city-input').value;
  getCoordinates(city);
});

