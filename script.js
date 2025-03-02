const cityInput = document.getElementById("city-input"),
  searchButton = document.getElementById("search-btn"),
  cityName = document.getElementById("city-name"),
  cityTemp = document.getElementById("city-temp"),
  cityTime = document.getElementById("city-time"),
  cityHumidity = document.getElementById("city-humidity"),
  cityWeatherIcon = document.getElementById("weather-icon"),
  errorMsg = document.getElementById("error-msg"),
  weatherDetails = document.querySelector(".weather-details");

//fetch API
async function getData(cityname) {
  const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=c854ee98957b44b3b17131804250203&q=${cityname}&aqi=yes`
  );
  return await promise.json();
}

searchButton.addEventListener("click", async () => {
  const userInput = cityInput.value.trim();
  if (userInput == 0) {
    alert("Please enter a city name");
  } else {
    try {
      const result = await getData(userInput);
      console.log(result);
      cityName.innerText = `${result.location.name},${result.location.region}-${result.location.country}`;
      cityTemp.innerText = `${result.current.temp_c} °C`;
      cityHumidity.innerText = `Humidity - ${result.current.humidity}%`;
      cityTime.innerText = `Local Time - ${result.location.localtime}`;

      //get icons from API
      const weatherIcon = `https:${result.current.condition.icon}`;
      cityWeatherIcon.src = weatherIcon;

      cityWeatherIcon.style.display = "flex";
      weatherDetails.style.display = "flex";
      errorMsg.style.display = "none";
    }
    catch (error) {
      errorMsg.innerText = "City not found!";
      errorMsg.style.display = "block";
      weatherDetails.style.display = "none";
    }
  }
});
