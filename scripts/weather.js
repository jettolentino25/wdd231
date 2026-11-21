const currentTemp = document.querySelector("#current-temp");
const weatherFigure = document.querySelector("figure");
const weatherIcon = document.querySelector("#weather-icon");
const caption = document.querySelector("figcaption");

const apiKey = "b2afc8d11f6d786159053b10ca84ddd0";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.76&lon=6.64&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status} ${await response.text()}`);
        }

        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error(error);
        currentTemp.textContent = "currently unavailable.";
    }
}

function displayResults(data) {
    const weather = data.weather[0];

    currentTemp.textContent = `${data.main.temp} °C.`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    weatherIcon.alt = weather.description;
    caption.textContent = weather.description;
    weatherFigure.hidden = false;
}

apiFetch();