let searchBar = document.querySelector(".search-bar");
let searchButton = document.querySelector(".search-button")
let queriedCity = '';
let returnedCity = '';
let fiveDayArray = [];

let cityName = document.querySelector("#city-name");
let currentTemp = document.querySelector(".temperature");
let feelsLike = document.querySelector(".feels-like");
let windSpeed = document.querySelector(".wind-speed");
let windDirection = document.querySelector(".wind-direction"); //direction in degrees
let weatherIcon = document.querySelector(".weather-icon");
let humidity = document.querySelector(".humidity");
let fiveDayContainer = document.querySelector("#five-day-forecast");


// 5day forecast vars
let weatherStat = ["Temperature", "Feels Like", "Wind/Direction", "Humidity"]; //holds the ids for the 4 pieces of info on each 5 day forecast card


// cityNameFive.textContent = fiveDayArray.city.name + " " + "(" + dayjs().format('MMMM D,YYYY') + ")";
// currentTempFive.textContent = "Temperature: " + fiveDayArray.list[0].main.temp; //temp in Kelvins
// feelsLikeFive.textContent = "Feels Like: " + fiveDayArray.list[0].main.feels_like;
// windSpeedFive.textContent = "Wind Speed: " + fiveDayArray.list[0].wind.speed;
// windDirectionFive.textContent = "Wind Direction: " + fiveDayArray.list[0].wind.deg; //direction in degrees
// humidityFive.textContent = "Humidity: " + fiveDayArray.list[0].main.humidity;
// weatherIconFive.src = "https://openweathermap.org/img/wn/" + fiveDayArray.list[0].weather[0].icon + "@2x.png";

//search bar returns promise from openweather api
//search bar where user can search for a city name
searchButton.addEventListener("click", function() {
        fetchWeather(searchBar.value.trim());
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
            

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${returnedCity[1]}&lon=${returnedCity[2]}&appid=93a1211a2091533d81982e5d6d87d1ab&units=imperial`); //current forecast fetch


        
        // 5-day forecast // 
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDayArray = data;
            //current day weather at index 0
            cityName.textContent = fiveDayArray.city.name + " " + "(" + dayjs().format('MMMM D,YYYY') + ")";

            currentTemp.textContent = "Temperature: " + fiveDayArray.list[0].main.temp; //temp in Kelvins
            feelsLike.textContent = "Feels Like: " + fiveDayArray.list[0].main.feels_like;
            
            windSpeed.textContent = "Wind Speed: " + fiveDayArray.list[0].wind.speed;
            windDirection.textContent = "Wind Direction: " + fiveDayArray.list[0].wind.deg; //direction in degrees
            
            humidity.textContent = "Humidity: " + fiveDayArray.list[0].main.humidity;
        
            weatherIcon.src = "https://openweathermap.org/img/wn/" + fiveDayArray.list[0].weather[0].icon + "@2x.png";


            //5 day forecast
            cityNameFive.textContent = fiveDayArray.city.name + " " + "(" + dayjs().format('MMMM D,YYYY') + ")";

            currentTempFive.textContent = "Temperature: " + fiveDayArray.list[0].main.temp; //temp in Kelvins
            feelsLikeFive.textContent = "Feels Like: " + fiveDayArray.list[0].main.feels_like;
            
            windSpeedFive.textContent = "Wind Speed: " + fiveDayArray.list[0].wind.speed;
            windDirectionFive.textContent = "Wind Direction: " + fiveDayArray.list[0].wind.deg; //direction in degrees
            
            humidityFive.textContent = "Humidity: " + fiveDayArray.list[0].main.humidity;
        
            weatherIconFive.src = "https://openweathermap.org/img/wn/" + fiveDayArray.list[0].weather[0].icon + "@2x.png";


            //display weather on cards




            
        })

        

}


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

        let weekDays = [];
        weekDays[i] = document.createElement("h5");
        weekDays[i].className = "card-title";
        weekDays[i].textContent = "Day " + (i);
        classCardBody.appendChild(weekDays[i]); 
    
   
    //4 p tags with class card-text and id unique to weather stat represented
        for (let j = 0; j < 4; j++) {
            let weatherStats = document.createElement("p");
            weatherStats.className = "card-text";
            weatherStats.id = "weather-stat" +[j];
            weatherStats.textContent = weatherStat[j];

            classCardBody.appendChild(weatherStats); 
        }

    //append to section element with id "five-day-forecast"
    
    


  
    //hourBlock1.value = localStorage.getItem(tempArray[i]);


        //  vvvv  DELETE vvvv
    
  };



//create element

//set text content

//append to page


//pull from the array to populate city list on left column






//when user clicks on one of the previously searched cities (event delegation -- event.target.matches(".button"), event.target.textContent), rerun the fetch and post the current weather to the center of the page