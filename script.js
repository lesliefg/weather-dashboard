//===============Declared Variables===============
var searchHistoryList = document.querySelector("#searchHistory");
const searchButton = document.querySelector("#searchBtn");
const clearButton = document.querySelector("#clearBtn");
const cityInput = document.querySelector("#citySearch");

//Open weather app API Key provided from account
const apiKey = '98d4766f77444b6073e26a5a8e1f7df6';
var today = dayjs();
var cityID = "Chicago";

//===============Event Listeners===============
searchButton.addEventListener('click', function() {
    recentHistoryList();
});

clearButton.addEventListener('click', function() {
    localStorage.clear();
})


//===============Functions===============
//Save city search history
function getCityList () {
    var recentList = localStorage.getItem("cityList");
    if (recentList !== null ){
        newList = JSON.parse(recentList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function addCity (n) {
    var addedList = getCityList();
    addedList.push(n);
    localStorage.setItem("cityList", JSON.stringify(addedList));
};

function recentHistoryList () {
    var searchHistory ={
        city: cityInput.value,
    }
    addCity(searchHistory);
};

//Render city search history
function renderHistoryList () {
    searchHistoryList.innerHTML = "";
    var cityList = getCityList();  
    var recentCities = cityList.slice(0,10);
    //This will increase the data indez by 1 for each list item
    for (var i = 0; i < recentCities.length; i++) {
        var item = recentCities[i];
        var list = document.createElement("button");
        list.textContent = item.city;
        list.setAttribute("data-index", i);
        list.setAttribute("city", item.city);
        list.classList.add("list-group-item", "cityResearch");
        searchHistoryList.appendChild(list);
    }
};

//Weather API fetch for current
function getCurrent( cityID ) {
    // cityID = cityInput.value;
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityID},US&appid=${apiKey}`;
    fetch(currentUrl)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      renderWeather(data);
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  };

function renderWeather( d ) {
  var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  var currentDate = dayjs().format('dddd, MMMM D, YYYY ');
  var iconCode = d.weather[0].icon;
  let weatherIcon = "https://openweathermap.org/img/w/" + iconCode + ".png";

  document.getElementById('location').innerHTML = d.name + ' (' + currentDate + ')';
  document.getElementById('wicon').setAttribute('src', weatherIcon);
  document.getElementById('description').innerHTML = 'Currently: ' + d.weather[0].description;
  document.getElementById('temp').innerHTML = 'Temp: ' + fahrenheit + '&deg; F';
  document.getElementById('wind').innerHTML = 'Wind: ' + d.wind.speed + 'mph';
  document.getElementById('humidity').innerHTML = 'Humidity: ' + d.main.humidity + '%';

  // var cityFive = d.id;
  var geoLat = d.coord.lat;
  var geoLon = d.coord.lon;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${geoLat}&lon=${geoLon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  // var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityFive}&appid=${apiKey}&cnt=6`;
  fetch(fiveDayUrl)
  .then(function(response) { return response.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
      for (var i = 1; i < 6; i++) {
        var dateCode = data.daily[i].dt;
        var dailyDate = dayjs(dateCode * 1000).format('MM/DD/YYYY');
        let dailyIcon = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
        var desc = data.daily[i].weather[0].description;
        var temp = Math.round(((parseFloat(data.daily[i].temp.day)-273.15)*1.8)+32);
        var humid = data.daily[i].humidity;
        console.log(dailyDate);
        console.log(desc);
        console.log(temp);
        console.log(humid);

        var weekContainer = document.getElementById("weekWeather");
        var dailyCard = document.createElement("div");
        dailyCard.className = "col custombox";
        dailyCard.innerHTML = `
                        <div id="date">${dailyDate}</div>
                        <div id="icons"><img id="dailyIcon" alt="Weather icon" src="${dailyIcon}"></div>
                        <div id="description">${desc}</div>
                        <div id="temp">Temp: ${temp}&deg; F</div>
                        <div id="humidity">Humidity: ${humid}%</div>`;
        weekContainer.appendChild(dailyCard);
    }
    })
    .catch(function() {
      // catch any errors
    })
};

window.onload = function() {
  getCurrent();
  renderHistoryList();
};

//https://openweathermap.org/forecast5