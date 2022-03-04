const api = {
  key: `6504cbddc0c6bb473e39ac88ea98d92f`,
  baseurl: `https://api.openweathermap.org/data/2.5/`,
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    console.log(searchBox.value);
    getResuts(searchBox.value);
  }
}

function getResuts(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherEL = document.querySelector(".weather");
  weatherEL.innerHTML = `${weather.weather[0].main}`;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `${Math.round(
    weather.main.temp_min
  )}<span>°C</span>  /  ${Math.round(weather.main.temp_max)}<span>°C</span>`;
}

function dateBuilder(m) {
  let months = [
    "January",
    "February",
    "Match",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[m.getDay()];
  let date = m.getDate();
  let month = months[m.getMonth()];
  let year = m.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
