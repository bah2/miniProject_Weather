"use strict";
// citiesArray = document.getElementById("citiesArray");
window.onload = init;
let tableBody = document.getElementById("tableBody");
const weatherDropdownList = document.getElementById("weatherDropdownList");
const userSearchBtn = document.getElementById("userSearchBtn");
const outPuts = document.getElementById("outPuts");


function init() {
  // populating dropDown menu
  let newOpt = document.createElement("option");
  newOpt.value = "";
  newOpt.textContent = "Select a city";
  weatherDropdownList.appendChild(newOpt);

  let citiesArrayLength = citiesArray.length;

  for (let i = 0; i < citiesArrayLength; i++) {
    let newOpt = document.createElement("option");
    newOpt.text = citiesArray[i].name;
    weatherDropdownList.appendChild(newOpt);
  }
// Search button with onclick to display weather informations
  userSearchBtn.onclick = () => {
    function reset(table){
      table.replaceChildren();
    }
    for (let city of citiesArray) {
      if (city.name == weatherDropdownList.value) {
        fetch(
          `https://api.weather.gov/points/${city.latitude},${city.longitude}`
        )
          .then((Response) => Response.json())
          .then((data) => {
            fetch(data.properties.forecast)
              .then((Response) => Response.json())
              .then((secondFetch) => {
                weatherInfoDisplay(secondFetch);
              });
          });
      }
    }
    // function that handles diplay on tables
    function weatherInfoDisplay(data) {
     
      for (let weatherDet of data.properties.periods) {
        let row = tableBody.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
      
      
        cell1.innerHTML = weatherDet.name;
        cell2.innerHTML =
          weatherDet.temperature + " ," 
          + weatherDet.temperatureUnit;
        cell3.innerHTML =
          weatherDet.windDirection + " ,"
           + weatherDet.windDirection;
        cell4.innerHTML = weatherDet.shortForecast;
        
        
      }
      
    }
    // reset button for table
    reset(tableBody);
  };

};
