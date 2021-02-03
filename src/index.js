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

//Search engine

function showTemp(response) {
  let todayTemp = document.querySelector("#today-temp");
  let temp = Math.round(response.data.main.temp);
  todayTemp.innerHTML = `${temp}º`;
  let feelsLike = document.querySelector("#feels-like");
  let feels = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `${feels}º`;
  let todayHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  todayHumidity.innerHTML = `${humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${wind} km/h`;
}

function search(event) {
  event.preventDefault();
  updateTime();
  let cityInput = document.querySelector("#search-city-input");
  let cityTitle = document.querySelector("#city");
  cityTitle.innerHTML = cityInput.value;
  let apiKey = "b3a63df8beace64c182e708181f083a8";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios.get(`${apiUrl}q=${cityInput.value}&units=metric&appid=${apiKey}`).then(showTemp);
}

let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", search);
