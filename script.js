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
var formSubmitHandler = function(event){
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

// this function allows for the info fetched to be displayed on the website 
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "low"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "regular"
    }
    else if(index.value >8){
        uvIndexValue.classList = "high"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //this appends the index to the current weather
    weatherOutputEl.appendChild(uvIndexEl);
}

// this function is to fetch the data for the next 5 days from the API
var get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

// this function is to allow the data fetched from API to be displayed on the website 
var display5Day = function(weather){//
    futureForecastEl.textContent = ""
    forecastDisplayTitle.textContent = "Forecast for the next 5 days:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";



       //this creates a date element for the future weather forecast
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //this creates a image element for the future weather forecast 
           var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
        //appends to card
       forecastEl.appendChild(weatherIcon);
       
       //this is to create a temp span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //appends to card
        forecastEl.appendChild(forecastTempEl);
        //this is to create a humidity span 
       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //appends to card
       forecastEl.appendChild(forecastHumEl);

       
        futureForecastEl.appendChild(forecastEl);
    }

}

//this triggers the buttons to work
cityFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryButtonEl.addEventListener("click", pastSearchHandler);