let searchBar = document.querySelector("#search-bar");
let searchButton = document.querySelector("#search-button")
let queriedCity = '';
let returnedCity = '';
let infoArray = [];
let fiveDayArray = [];

//search bar returns promise from openweather api
//search bar where user can search for a city name
searchButton.addEventListener("click", function() {
        fetchWeather(searchBar.value);
    });

//put this in an event listener so when user searches a city the fetch is run
function fetchWeather(input) {
     queriedCity = input; 
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=93a1211a2091533d81982e5d6d87d1ab`) //geo fetch
        .then(function (response) {
            return response.json();
        })
        .then(function (citiesFound) {
                returnedCity = [citiesFound[0], citiesFound[0].lat, citiesFound[0].lon];


                //IIFE function that cycles through 5 returned cities to find the closest match to what was searched
                //does not account for the country so searching New York returns New York County and then New York in UK
                //so it chooses the UK location
                // (function() { 
                //     for (let i = 0; i <= citiesFound.length; i++) {            
                //       if (queriedCity == citiesFound[i]) {             
                //         returnedCity = citiesFound[i];                
                //         return; 
                //       }                                  
                //     }                           
                //     returnedCity = citiesFound[0];      
                //
                //})();
            

            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${returnedCity[1]}&lon=${returnedCity[2]}&appid=93a1211a2091533d81982e5d6d87d1ab`); //current forecast fetch


        
        // 5-day forecast // 
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            infoArray = data;

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${returnedCity[1]}&lon=${returnedCity[2]}&appid=93a1211a2091533d81982e5d6d87d1ab`); //5-day forecast fetch
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (returnFiveDay) {
            fiveDayArray = returnFiveDay;
        })
}

//pull info from data, create an object, and push to an array
function renderWeather() {
    let cityName = infoArray.name;

}


 //
//infoArray
//.list[0] //current weather
//.wind.speed //current wind in mph
//.weather[0].icon // weather icon
//.main.* // feels_like, humidity, temp, max temp, min temp, pressure
//.wind.deg // wind direction in degrees
//infoArray[0].name


//fiveDayArray.city.name
//
//fiveDayArray.list[0]
//.main.temp
//.feels_like
//.temp-max
//.temp-min
//.humidity
//
//fiveDayArray.list[0].wind
//.speed
//.deg //direction
//
//fiveDayArray.list[0].weather[0].icon


//pull from the array to populate city list on left column
//when user clicks on one of the previously searched cities (event delegation -- event.target.matches(".button"), event.target.textContent), rerun the fetch and post the current weather to the center of the page