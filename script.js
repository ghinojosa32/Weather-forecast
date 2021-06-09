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
