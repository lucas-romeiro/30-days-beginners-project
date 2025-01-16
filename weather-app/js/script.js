"use strict";

class App {
  // Elements
  _search = document.querySelector(".search");
  _error = document.querySelector(".error");
  _weatherBox = document.querySelector(".weather");
  _weatherIcon = document.querySelector(".weather__icon");
  _cityName = document.querySelector(".weather__city");
  _temperature = document.querySelector(".weather__temperature");
  _humidity = document.querySelector(".weather__humidity");
  _wind = document.querySelector(".weather__wind");

  constructor(API_KEY) {
    if (!API_KEY) throw new Error("API key is required");
    this._API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
    this._search.addEventListener("submit", this._getQuery.bind(this));
  }

  _showWeatherBox() {
    this._weatherBox.classList.remove("hidden");
  }

  _updateUI(data) {
    this._cityName.textContent = data.name;
    this._temperature.innerHTML = `${Math.round(data.main.temp)} °C`;
    this._humidity.innerHTML = `${data.main.humidity} %`;
    this._wind.innerHTML = `${data.wind.speed} km/h`;
  }

  _displayError(message) {
    this._error.textContent = message;
    this._error.classList.remove("hidden");
    this._weatherBox.classList.add("hidden");

    setTimeout(() => {
      this._error.classList.add("hidden");
    }, 2000);
  }

  _updateIconImage(weather) {
    const iconMap = {
      Clouds: "./assets/images/clouds.png",
      Clear: "./assets/images/clear.png",
      Rain: "./assets/images/rain.png",
      Drizzle: "./assets/images/drizzle.png",
      Mist: "./assets/images/mist.png",
    };
    this._weatherIcon.src = iconMap[weather] || "./assets/images/clouds.png";
  }

  async _checkWeather(city) {
    try {
      const data = await this._getData(city);
      this._updateUI(data);
      this._updateIconImage(data.weather[0].main);
      this._showWeatherBox();
    } catch (err) {
      console.error(err.message);
      this._displayError(err.message);
    }
  }

  async _getData(city) {
    try {
      const response = await fetch(`${this._API_URL}&q=${city}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("Cidade não encontrada.");

        throw new Error("Erro ao recuperar dados da API.");
      }

      const data = await response.json();
      if (!data || !data.main || !data.weather)
        throw new Error("Dados inesperados recebidos da API.");

      return data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  _getQuery(e) {
    e.preventDefault();
    const query = this._search.querySelector(".search__input").value.trim();

    if (!query) {
      this._displayError("Por favor, insira uma cidade.");
      return;
    }

    this._search.querySelector(".search__input").value = ""; // Clear input
    this._checkWeather(query);
  }
}

const app = new App("YOUR_API_KEY");
