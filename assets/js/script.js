let searchBar = document.querySelector(".search-bar");
let searchButton = document.querySelector(".search-button")
// let queriedCity = '';
let returnedCity = '';
let fiveDayArray = [];
let currentArray = [];

let cityName = document.querySelector("#city-name");
let currentTemp = document.querySelector(".temperature");
let feelsLike = document.querySelector(".feels-like");
let windSpeed = document.querySelector(".wind-speed");
let windDirection = document.querySelector(".wind-direction"); //direction in degrees
let weatherIcon = document.querySelector(".weather-icon");
let humidity = document.querySelector(".humidity");

let fiveDayContainer = document.querySelector("#five-day-forecast");
let weekDays = [];
let iconFiveDay = [];
let iconFiveDayImg = [];
let weatherIconFive = [];
let weatherStat = ["Max", "Min", "Feels Like", "Wind", "Humidity"]; //holds the ids for the 5 pieces of info on each 5 day forecast cards

let previousCities = JSON.parse(localStorage.getItem("previousCities")) || [];

let cityContainer = document.querySelector("#city-container");
let tempId = '';

let topCities = ["New York", "Chicago", "Los Angeles", "Dallas", "San Diego", "San Francisco", "Houston", "San Antonio", "Philadelphia", "Detroit", "Atlanta", "Phoenix", "Seattle", "Denver", "New Orleans", "Austin"];

let cityInt = Math.floor(Math.random() * topCities.length);

fetchWeather(topCities[cityInt]);

renderCitiesList();

//listener for search bar where user can search for a city name
searchButton.addEventListener("click", function() {
        fetchWeather(searchBar.value.trim());
        previousCities.unshift(searchBar.value);
        if (previousCities.length > 8) {
            previousCities = previousCities.slice(0, 8);
        }
        localStorage.setItem("previousCities", JSON.stringify(previousCities));
        searchBar.value = '';
        clearCitiesList();
        renderCitiesList();
    });

//listener for previously searched city buttons below search bar
cityContainer.addEventListener("click", function(event) {
    if (event.target.matches(".city-button")) {
        fetchWeather(event.target.value);
        }
});



    //generate cards
    
for (let i = 0; i < 5; i++) {    
    //create a div 
    let forecastCards = document.createElement("div");
    forecastCards.className = "col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-1";
    
    fiveDayContainer.appendChild(forecastCards);
    
    //create a div with class "card"
    let classCard = document.createElement("div");
    classCard.className = "card";
    
    forecastCards.appendChild(classCard);
    
    //create a div with class "card-body"
    let classCardBody = document.createElement("div");
    classCardBody.className = "card-body";
    
    classCard.appendChild(classCardBody);
    
    //h5 with class "card-title" and text content "Day 1" through "Day 5"
    
    
    weekDays[i] = document.createElement("h5");
    weekDays[i].className = "card-title";
    weekDays[i].textContent = dayjs().add(i + 1, 'day').format('MMMM D,YYYY');   
    
    iconFiveDay[i] = document.createElement("span");
    iconFiveDayImg[i] = document.createElement("img");
    iconFiveDayImg[i].className = "weather-icon-five-" + i;
    
    classCardBody.appendChild(weekDays[i]); 
    iconFiveDay[i].appendChild(iconFiveDayImg[i]); 
    classCardBody.appendChild(iconFiveDay[i]); 
    
    
    
    //4 p tags with class card-text and id unique to weather stat represented
    for (let j = 0; j < 5; j++) {
        let weatherStats = document.createElement("p");
        weatherStats.className = "card-text";
        weatherStats.id = "weather-stat" + (i * 10 + j);
        weatherStats.textContent = weatherStat[j];
        classCardBody.appendChild(weatherStats); 
    }
    
};



//pull cities from the array in localStorage to populate city list on left column

//when user clicks on one of the previously searched cities (event delegation -- event.target.matches(".button"), event.target.textContent), rerun the fetch and post the current weather to the center of the page

function clearCitiesList() {
        if (previousCities.length > 0) {
        for (let i = 0; i < previousCities.length; i++) {
            tempId = document.getElementById("city-name-" + i); //this isnt coming up as a node item, tempId is returning 'null'
            if (!tempId == '') {
            cityContainer.removeChild(tempId);
            }
        }
    }
}


function renderCitiesList() {
    for (let i = 0; i < previousCities.length; i++) {
        console.log(previousCities[i]);
        //create element
        let newDiv = document.createElement("input");
        newDiv.className = "btn btn-primary m-1 city-button";
        newDiv.setAttribute("type", "button")
        newDiv.id = "city-name-" + i;
        newDiv.value = previousCities[i];
        cityContainer.appendChild(newDiv); 
    }
}


function fetchWeather(input) {
    // queriedCity = input; 
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
            

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${returnedCity[1]}&lon=${returnedCity[2]}&appid=93a1211a2091533d81982e5d6d87d1ab&units=imperial`); //current forecast fetch


        
        // 5-day forecast // 
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDayArray = data;
            //5 day forecast
            for (let i = 0; i < 5; i++) {

                let maxTempFive = document.querySelector("#weather-stat" + (i * 10));

                maxTempFive.textContent = "Max: " + fiveDayArray.list[(i + 1) * 7].main.temp_max + "\u00B0"; 

                let minTempFive = document.querySelector("#weather-stat" + ((i * 10) + 1));

                minTempFive.textContent = "Min: " + fiveDayArray.list[(i + 1) * 7].main.temp_min + "\u00B0"; 
                
                let feelsLikeFive = document.querySelector("#weather-stat" + ((i * 10) + 2));
                
                feelsLikeFive.textContent = "Feels Like: " + fiveDayArray.list[(i + 1) * 7].main.feels_like + "\u00B0";
                
                let windSpeedFive = document.querySelector("#weather-stat" + ((i * 10) + 3));

                let windDir = getDirection(fiveDayArray.list[i * 8].wind.deg);
                windSpeedFive.textContent = "Wind Speed: " + fiveDayArray.list[(i + 1) * 7].wind.speed + " mph " + windDir;
                
                let humidityFive = document.querySelector("#weather-stat" + ((i * 10) + 4));

                humidityFive.textContent = "Humidity: " + fiveDayArray.list[(i + 1) * 7].main.humidity + "%";
            
               
                iconFiveDayImg[i].src = "https://openweathermap.org/img/wn/" + fiveDayArray.list[i].weather[0].icon + ".png";
                
            } 
        })
        .then(function (getCurrentData) {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${returnedCity[1]}&lon=${returnedCity[2]}&appid=93a1211a2091533d81982e5d6d87d1ab&units=imperial`) //current fetch
        })
        .then(function (currentResponse) {
            return currentResponse.json();
        })
        .then(function (currentData) {
            currentArray = currentData;

            //current day weather at index 0
            cityName.textContent = currentArray.name + " " + "(" + dayjs.unix(1691258400).format('MMMM D,YYYY') + ")";

            currentTemp.textContent = "Temperature: " + currentArray.main.temp + "\u00B0"; //temp in Kelvins
            feelsLike.textContent = "Feels Like: " + currentArray.main.feels_like + "\u00B0";
            
            windSpeed.textContent = "Wind Speed: " + currentArray.wind.speed + " mph";
            let windDir = getDirection(currentArray.wind.deg);
            windDirection.textContent = "Wind Direction: " + windDir + "\u00B0"; //direction in degrees
            
            humidity.textContent = "Humidity: " + currentArray.main.humidity + "%";
        
            weatherIcon.src = "https://openweathermap.org/img/wn/" + currentArray.weather[0].icon + "@2x.png";
        })

        

}


function getDirection(angle) {
	// We divide it into 16 sections
	let directions = ["N","NNE","NE","ENE","E",
		"ESE", "SE", "SSE","S",
		"SSW","SW","WSW","W",
		"WNW","NW","NNW" ];
	// This means, every 360 / 16 degree, there's a section change
	// So, in our case, every 22.5 degree, there's a section change
	// In order to get the correct section, we just need to divide
	let section = parseInt( angle/22.5 + 0.5 );
	// If our result comes to be x.6, which should normally be rounded off to
	// int(x) + 1, but parseInt doesn't care about it
	// Hence, we are adding 0.5 to it

	// Now we know the section, just need to make sure it's under 16
	section = section % 16;

	// Now we can return it
	return directions[section];
}