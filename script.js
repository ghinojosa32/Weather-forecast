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
