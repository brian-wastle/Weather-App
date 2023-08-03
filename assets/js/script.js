



//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//search bar where user can search for a city name


//put this in an event listener so when user searches a city the fetch is run
fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=93a1211a2091533d81982e5d6d87d1ab")
    .then(function (response) {
      return response.json();
    })
    .then(function (citiesFound) {
      console.log(citiesFound);
      let firstCity = citiesFound[0];
      console.log(firstCity.lat);
      console.log(firstCity.lon);

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=93a1211a2091533d81982e5d6d87d1ab`)

    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

//posts current weather to center of page

//generate a list of cities below the search bar and store them in localStorage

//when user clicks on one of the previously searched cities (event delegation -- event.target.matches(".button"), event.target.textContent), rerun the fetch and post the current weather to the center of the page

    
