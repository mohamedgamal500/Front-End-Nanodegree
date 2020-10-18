/* Global Variables */
//inputs
const zipCodeElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');

//results
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const countryCode = 'us';
const apiKey = ''; //  you can get your own apikey from https://openweathermap.org/

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',generateData);

/* Function called by event listener */
function generateData() {
  const zipCode = zipCodeElement.value;
  const feelings = feelingsElement.value;
  getWeather(zipCode)
    .then((weatherData)=> {
    console.log("weather",weatherData.main.temp);
    data={ temp: weatherData.main.temp, date: newDate, userContent:feelings };
    console.log("data",data);
      return postData('/addData',data);
    }).then((data) =>{
        console.log("data post res",data);
        updateUi();
      })
}




//**** app functions ****//
/* Function to GET Web API Data*/
async function getWeather (zipCode) {
    const res = await fetch(`${baseUrl}?zip=${zipCode},${countryCode}&appid=${apiKey}`);
    try {
      const weatherData = await res.json();
      return weatherData;
    } catch (error) {
      console.log("error", typeof error);
      console.log("error", error.message);
    }
  }

/* Function to POST data */
async function postData  (url = '', data = {}) {
    console.log("data post",data);
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    try {
      const data = await res.json();
      console.log("data post",data);
      return data;
    }
    catch (error) {
      console.log("error", error.message);
    }
  };
  
/* Function to GET Project Data */
async function updateUi () {
    const res = await fetch('/all');
    try {
      const data = await res.json();
      temp.innerHTML = data.temp;
      date.innerHTML = data.date;
      content.innerHTML = data.userContent;
    }
    catch (error) {
        console.log("error", error.message);
    }
  };

  //async await
  /*
  async function showData(){
    weatherData=await getWeather();
    data={ temp: weatherData.main.temp, date: newDate, userContent:feelings };
    postData('/addData',data);
    updateUi();
  }
  */

  