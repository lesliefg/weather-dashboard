//Declared varibles
// const dayForecast = document.querySelector("#")
// const fiveDay = document.querySelector("#")
const searchHistory = document.querySelector("#searchHistory")
const searchButton = document.querySelector("#searchBtn")
const clearButton = document.querySelector("#clearBtn")
const citySearch = $('#citySearch').val();
//Open weather app API Key provided from account
const apiKey = '2b4ac47a74d69a1d441405a040cd7545';



function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?' + citySearch + '&units=imperial' + '&appid=' + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                
                
            }
        })
}

//https://openweathermap.org/forecast5

// var userContainer = document.getElementById('users');
// var fetchButton = document.getElementById('fetch-button');

// function getApi() {
//   var requestUrl = 'https://api.github.com/users?per_page=30';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // Use the console to examine the response
//       console.log(data);
//       // TODO: Loop through the data and generate your HTML
//       for (var i = 0; i < data.length; i++) {
//         var repoLink = document.createElement('a');
//         repoLink.setAttribute('href', data[i].html_url)
//         repoLink.textContent = data[i].login
//         userContainer.append(repoLink);
//       }
//     });
// }
// fetchButton.addEventListener('click', getApi);



//pull api and append walk through


// //Acceptance Criteria
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city