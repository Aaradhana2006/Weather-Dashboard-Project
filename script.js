const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const resultBox = document.getElementById("weatherResult");

const apiKey = "1ba30c71c4642ff1331656c70819d159";

async function getWeather() {

    //get the city name from the input field and trim any extra spaces
    const city = cityInput.value.trim();

     //checking if input is empty and if it is, display a message and return
     if(!city) {
    resultBox.innerHTML =
    "<p>Please enter a city name.</p>";
    return;
}

    resultBox.innerHTML =
    "<p>⏳ Fetching weather data...</p>";

    try {

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();
        const icon =
            data.weather[0].icon;

        resultBox.innerHTML = `
        <div class="weather-card">
            <h2>📍${data.name}</h2>

        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="Weather Icon"
        >
            <p><strong>🌡️Temperature:</strong>
            ${data.main.temp} °C</p>

            <p><strong>💧Humidity:</strong>
            ${data.main.humidity}%</p>

            <p><strong>💨Wind Speed:</strong>
            ${data.wind.speed} m/s</p>

            <p><strong>🌤️Weather:</strong>
            ${data.weather[0].description}</p>

            <p>
            👀 <strong>Visibility:</strong>
            ${data.visibility/1000} km</p>


        </div>
        `;

    } catch(error) {

        resultBox.innerHTML =
        `<p>${error.message}</p>`;

    }
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});