const apiKey = "b2afc8d11f6d786159053b10ca84ddd0";
const weatherStatus = document.querySelector("#weather-status");
const forecastStatus = document.querySelector("#forecast-status");
const forecastList = document.querySelector("#forecast-list");

async function fetchWeather(endpoint) {
    const url = new URL(`https://api.openweathermap.org/data/2.5/${endpoint}`);
    url.search = new URLSearchParams({
        lat: "14.5995",
        lon: "120.9842",
        units: "metric",
        appid: apiKey
    });

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Weather request failed (${response.status}).`);
    }
    return response.json();
}

async function loadCurrentWeather() {
    try {
        const data = await fetchWeather("weather");
        const temperature = Math.round(data.main.temp);
        weatherStatus.textContent = `Manila · ${temperature} °C · ${data.weather[0].description}`;
    } catch {
        weatherStatus.textContent = "Manila weather is temporarily unavailable.";
    }
}

async function loadForecast() {
    try {
        const data = await fetchWeather("forecast");
        const dateKey = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Manila",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        const dateLabel = new Intl.DateTimeFormat("en-PH", {
            timeZone: "Asia/Manila",
            weekday: "long",
            month: "short",
            day: "numeric"
        });
        const today = dateKey.format(new Date());
        const days = new Map();

        for (const entry of data.list) {
            const date = new Date(entry.dt * 1000);
            const key = dateKey.format(date);
            if (key === today) {
                continue;
            }
            const previous = days.get(key);
            if (!previous || entry.main.temp > previous.temperature) {
                days.set(key, { date, temperature: entry.main.temp });
            }
        }

        const forecast = [...days.values()].slice(0, 3);
        if (forecast.length < 3) {
            throw new Error("The response did not contain three forecast days.");
        }

        for (const { date, temperature } of forecast) {
            const item = document.createElement("li");
            item.textContent = `${dateLabel.format(date)} · High ${Math.round(temperature)} °C`;
            forecastList.append(item);
        }
        forecastList.hidden = false;
        forecastStatus.textContent = "Daily highs from three-hour forecasts, Manila time.";
    } catch {
        forecastStatus.textContent = "The Manila forecast is temporarily unavailable.";
    }
}

loadCurrentWeather();
loadForecast();
