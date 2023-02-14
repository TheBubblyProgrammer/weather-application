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
  let iconElement = document.querySelector(`#icon`);
 
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(`src`,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` );
iconElement.setAttribute(`alt`, response.data.weather[0].description);
}







let city = `hazyview`;
let apiKey = `5ef4de8cd6b7fefcd7c42f98cf464ce8`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeatherConditions);
