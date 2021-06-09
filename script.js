var cities = [];

//here I have the variables in order like in the html file 
var cityFormEl=document.querySelector("#city-chosen");
var cityInputEl=document.querySelector("#city;");
var searchHistoryButtonEl = document.querySelector("#search-history");
var citySearchInputEl=document.querySelector("#searched-city")
var weatherOutputEl=document.querySelector("#weather-output");
var forecastDisplayTitle = document.querySelector("#forecast-display");
var futureForecastEl = document.querySelector("#future-forecast");

//this is going to be the function for the submit button to get the forecast for searched city
var formsubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.nodeValue.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        //used unshift to add one or more elements to the beginning of an array and returns the new length of the array 
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

// this is going to be the function that saves the search history
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

//this function is for the history link button to go back to past searches
var pastSearch = function(pastSearch){
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    //here we are costumizing the list 
    pastSearchEl.classList = "d-flex btn-light border p-3";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    searchHistoryButtonEl.prepend(pastSearchEl);
}

//this function is to tae you to the forecast for that city 
var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

//fetch data from API for the weather forecast
var getCityWeather = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

//this function allows the data fetched to be displayed in the website
var displayWeather = function(weather, searchCity){
    //this clears old content
    weatherOutputEl.textContent= "";  
    citySearchInputEl.textContent=searchCity;
 
    // date element
    var currentDate = document.createElement("span")
    currentDate.textContent=" --" + moment(weather.dt.value).format("MMM Do YY") + "-- ";
    citySearchInputEl.appendChild(currentDate);
 
    //this allows the icon from openweathermap to appear on the website 
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);
 
    //this creates span element to hold the temp information
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"
   
    //this creates span element to hold the wumidity information
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
 
    //this creates span element to hold the wind information
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"
 
    //this is to append temp to the container
    weatherOutputEl.appendChild(temperatureEl);
 
    //this is to append humidity to the container
    weatherOutputEl.appendChild(humidityEl);
 
    //this is to append wind to the container
    weatherOutputEl.appendChild(windSpeedEl);
 
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat,lon)

}

// this function is to fetch the uv data from the API
var getUvIndex = function(lat,lon){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
        });
    });
}
