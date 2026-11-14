const weatherStatus = document.querySelector("#weather-status");
const apiKey = "b2afc8d11f6d786159053b10ca84ddd0";

const url = new URL("https://api.openweathermap.org/data/2.5/weather");
url.search = new URLSearchParams({
    lat: "14.5995",
    lon: "120.9842",
    units: "metric",
    appid: apiKey
});

async function loadWeather() {
    weatherStatus.textContent = "Loading Manila weather…";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather request failed (${response.status}).`);
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;

        weatherStatus.textContent = `Manila · ${temperature} °C · ${description}`;
    } catch (error) {
        weatherStatus.textContent = "Manila weather is temporarily unavailable.";
        console.error(error.message);
    }
}

loadWeather();