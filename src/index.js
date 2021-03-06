function updateTime() {

  let now = new Date();

  let days = ["Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"];

  let day = days[now.getDay()];
  let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let dayTime = document.querySelector("#current-time");
  dayTime.innerHTML= `Last updated at ${time}`;
  let months = ["January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"];

  let month = months[now.getMonth()];
  let date = now.getDate();
  let monthDate = document.querySelector("#today-date");
  monthDate.innerHTML = `${day} ${month} ${date}`;
}

updateTime();

function showTemp(response) {
  let todayTemp = document.querySelector("#today-temp");
  let feelsLike = document.querySelector("#feels-like");
  let todayHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let currentIcon = document.querySelector("#current-icon");
  let weatherCondition = document.querySelector("#weather-condition");

  celsiusTemp = response.data.main.temp;
  celsiusFeels = response.data.main.feels_like;
  metricSpeed = response.data.wind.speed;

  todayTemp.innerHTML = `${Math.round(celsiusTemp)}º`;
  feelsLike.innerHTML = `${Math.round(celsiusFeels)}º`;
  todayHumidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windSpeed.innerHTML = `${Math.round(metricSpeed)} km/h`;
  currentIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherCondition.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  updateTime();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityInput = document.querySelector("#search-city-input");
  let cityTitle = document.querySelector("#city");
  cityTitle.innerHTML = cityInput.value;
  let apiKey = "b3a63df8beace64c182e708181f083a8";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios.get(`${apiUrl}q=${cityInput.value}&units=metric&appid=${apiKey}`).then(showTemp);
}

function imperial(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9/5) + 32;
  let fahrenheitFeels = (celsiusFeels * 9/5) + 32;
  let imperialSpeed = metricSpeed / 1.609
  
  let todayTemp = document.querySelector("#today-temp");
  let feelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind-speed");
  
  todayTemp.innerHTML = `${Math.round(fahrenheitTemp)}º`;
  feelsLike.innerHTML = `${Math.round(fahrenheitFeels)}º`;
  windSpeed.innerHTML = `${Math.round(imperialSpeed)} mph`;

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function metric(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-temp");
  let feelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind-speed");

  todayTemp.innerHTML = `${Math.round(celsiusTemp)}º`;
  feelsLike.innerHTML = `${Math.round(celsiusFeels)}º`;
  windSpeed.innerHTML = `${Math.round(metricSpeed)} km/h`;

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", imperial);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", metric);

let celsiusTemp = null;
let celsiusFeels = null;
let metricSpeed = null;

let apiKey = "b3a63df8beace64c182e708181f083a8";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
axios.get(`${apiUrl}q=Toronto&units=metric&appid=${apiKey}`).then(showTemp);


