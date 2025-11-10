const apikey = "44a46915c3cf67704022614e13b9d4a0";
const weatherDataE1 = document.getElementById("Weather-data");
const cityInputE1 = document.getElementById("city-input");
const formE1 = document.querySelector("form");
const loadingE1 = document.querySelector(".loading");

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputE1.value.trim();
  if (cityValue) {
    getWeatherData(cityValue);
  }
});

async function getWeatherData(cityValue) {
  try {
    loadingE1.classList.remove("hidden");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataE1.querySelector(".icon").innerHTML =
      `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;

    weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherDataE1.querySelector(".description").textContent = description;
    weatherDataE1.querySelector(".details").innerHTML = details
      .map((d) => `<div>${d}</div>`)
      .join("");

    // Change background color by weather
    changeBackground(description);

  } catch (error) {
    weatherDataE1.querySelector(".icon").innerHTML = "";
    weatherDataE1.querySelector(".temperature").textContent = "";
    weatherDataE1.querySelector(".description").textContent = "❌ City not found";
    weatherDataE1.querySelector(".details").innerHTML = "";
  } finally {
    loadingE1.classList.add("hidden");
  }
}

// Dynamic background
function changeBackground(description) {
  description = description.toLowerCase();
  if (description.includes("cloud")) {
    document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
  } else if (description.includes("rain")) {
    document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
  } else if (description.includes("clear")) {
    document.body.style.background = "linear-gradient(to right, #f7971e, #ffd200)";
  } else {
    document.body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
  }
}
