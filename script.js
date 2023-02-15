let currentTime = new Date();
let hoursMin = currentTime.toLocaleTimeString("en-ZA", {
  hour: `2-digit`,
  minute: `2-digit`,
});

let h2 = document.querySelector("h2");

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[currentTime.getDay()];
h2.innerHTML = `${day},  ${hoursMin}`;


function showWeatherConditions(response) {

  let temperatureElement = document.querySelector(`#temperature`);
  let cityElement = document.querySelector(`#city`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind` );
 let realFeelElement = document.querySelector("#realFeels")
  let sunsetElement = document.querySelector("#Sunset");
 let precipitationElement = document.querySelector(`#precipitation`);
  let iconElement = document.querySelector(`#icon`);
 



  console.log(response.data.sys.sunset)
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  sunsetElement.innerHTML =Unix(response.data.sys.sunset);
precipitationElement.innerHTML = updatedPrecipitation(response.data);
iconElement.setAttribute(`src`,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );
iconElement.setAttribute(`alt`, response.data.weather[0].description);


  celsiusTemperature = response.data.main.temp;


}

function Unix(unixTime) {
  let sunsetDate = new Date(unixTime * 1000);
  let sunsetHoursMin = sunsetDate.toLocaleTimeString("en-ZA", {
  hour: `2-digit`,
  minute: `2-digit`,
});

 let sunset = `${sunsetHoursMin}`
  return sunset;
}


function updatedPrecipitation(response) {
  if (response.hasOwnProperty("rain")) {
    return `${Math.round(response.rain["1h"])}mm`;
  } else {
    return `0mm`;
  }
}

function searchCity(city) {
  let apiKey = `5ef4de8cd6b7fefcd7c42f98cf464ce8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city`).value;
  searchCity(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}


function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;




let apiKey = `5ef4de8cd6b7fefcd7c42f98cf464ce8`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeatherConditions);

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, submitForm);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//add default search queryy
searchCity(`Nelspruit`);
