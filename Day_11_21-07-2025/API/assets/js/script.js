let image = document.getElementById("image");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let refresh = document.getElementById("refresh");
let imageDtl = document.getElementById("image-dtl");
let city = document.getElementById("location");

const getData = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=22.572645&lon=88.363892&appid=5a20e10e5c791ec0206da9d4d671486f"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    imageDtl.innerText = data.weather[0].description;
    city.innerText = data.name;
    temperature.innerText = (data.main.temp - 273.15).toFixed(1) + " °C";
    humidity.innerText = data.main.humidity + " %";
    pressure.innerText = data.main.pressure + " hPa";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

window.addEventListener("DOMContentLoaded", getData);

refresh.addEventListener("click", getData);
