"use strict";

// Classe principal da aplicação
class App {
  // Definição de elementos DOM
  _searchForm = document.querySelector(".search-form"); // Formulário de pesquisa
  _errorMessage = document.querySelector(".error-message"); // Mensagem de erro
  _weatherInfoBox = document.querySelector(".weather-info"); // Caixa de informações do tempo
  _weatherIcon = document.querySelector(".weather-info__icon"); // Ícone do tempo
  _cityName = document.querySelector(".weather-info__city"); // Nome da cidade
  _temperature = document.querySelector(".weather-info__temperature"); // Temperatura
  _humidity = document.querySelector(".weather-info__humidity"); // Umidade
  _wind = document.querySelector(".weather-info__wind"); // Velocidade do vento

  /**
   * Construtor da classe, inicializa a aplicação e valida a chave da API.
   * @param {string} API_KEY - Chave da API para acesso aos dados do tempo.
   */
  constructor(API_KEY) {
    if (!API_KEY) throw new Error("API key is required"); // Validação da chave da API
    this._API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`; // URL da API com a chave fornecida
    this._searchForm.addEventListener("submit", this._getQuery.bind(this)); // Adiciona um ouvinte de evento para o formulário de pesquisa
  }

  /**
   * Exibe a caixa de informações sobre o tempo.
   */
  _showWeatherInfoBox() {
    this._weatherInfoBox.classList.remove("hidden"); // Remove a classe 'hidden' para mostrar as informações
  }

  /**
   * Atualiza a interface do usuário com os dados recebidos da API.
   * @param {Object} data - Dados da cidade retornados pela API.
   */
  _updateUI(data) {
    this._cityName.textContent = data.name; // Atualiza o nome da cidade
    this._temperature.innerHTML = `${Math.round(data.main.temp)} °C`; // Atualiza a temperatura
    this._humidity.innerHTML = `${data.main.humidity} %`; // Atualiza a umidade
    this._wind.innerHTML = `${data.wind.speed} km/h`; // Atualiza a velocidade do vento
  }

  /**
   * Exibe a mensagem de erro e oculta a caixa de informações do tempo.
   * @param {string} message - Mensagem de erro a ser exibida.
   */
  _displayError(message) {
    this._errorMessage.textContent = message; // Exibe a mensagem de erro
    this._errorMessage.classList.remove("hidden"); // Remove a classe 'hidden' para mostrar a mensagem de erro
    this._weatherInfoBox.classList.add("hidden"); // Adiciona a classe 'hidden' para ocultar a caixa de informações

    // Oculta a mensagem de erro após 2 segundos
    setTimeout(() => {
      this._errorMessage.classList.add("hidden"); // Oculta a mensagem de erro
    }, 2000);
  }

  /**
   * Atualiza o ícone do clima com base nas condições meteorológicas.
   * @param {string} weather - Condição do tempo (e.g., 'Clouds', 'Clear', etc.)
   */
  _updateIconImage(weather) {
    // Mapeia a condição do tempo para o ícone correspondente
    const iconMap = {
      Clouds: "./assets/images/clouds.png",
      Clear: "./assets/images/clear.png",
      Rain: "./assets/images/rain.png",
      Drizzle: "./assets/images/drizzle.png",
      Mist: "./assets/images/mist.png",
    };

    // Define o ícone com base no clima ou usa o ícone de nuvens como padrão
    this._weatherIcon.src = iconMap[weather] || "./assets/images/clouds.png";
  }

  /**
   * Verifica as condições meteorológicas para uma cidade específica.
   * @param {string} city - Nome da cidade para a qual consultar o clima.
   */
  async _checkWeather(city) {
    try {
      // Recupera os dados da cidade
      const data = await this._getData(city);
      // Atualiza a interface com os dados recebidos
      this._updateUI(data);
      // Atualiza o ícone com a condição do tempo
      this._updateIconImage(data.weather[0].main);
      // Exibe a caixa de informações sobre o tempo
      this._showWeatherInfoBox();
    } catch (err) {
      console.error(err.message); // Loga o erro no console
      // Exibe a mensagem de erro
      this._displayError(err.message);
    }
  }

  /**
   * Recupera os dados da API de clima.
   * @param {string} city - Nome da cidade para buscar os dados meteorológicos.
   * @returns {Promise<Object>} - Retorna os dados da API como um objeto.
   */
  async _getData(city) {
    try {
      // Realiza a requisição para a API de clima
      const response = await fetch(`${this._API_URL}&q=${city}`);
      if (!response.ok) {
        // Se a cidade não for encontrada, lança um erro
        if (response.status === 404) throw new Error("Cidade não encontrada.");
        // Se ocorrer outro erro na requisição, lança um erro genérico
        throw new Error("Erro ao recuperar dados da API.");
      }

      // Converte a resposta para JSON
      const data = await response.json();
      // Valida os dados recebidos
      if (!data || !data.main || !data.weather)
        throw new Error("Dados inesperados recebidos da API.");

      return data; // Retorna os dados da cidade
    } catch (err) {
      console.error(err.message); // Loga o erro no console
      throw err; // Lança o erro para ser tratado na chamada da função
    }
  }

  /**
   * Lida com a pesquisa de cidade do usuário.
   * @param {Event} e - O evento de submit do formulário.
   */
  _getQuery(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    const query = this._searchForm
      .querySelector(".search-form__input")
      .value.trim(); // Obtém o valor da entrada

    // Se a entrada estiver vazia, exibe um erro
    if (!query) {
      this._displayError("Por favor, insira uma cidade.");
      return;
    }

    // Limpa o campo de pesquisa
    this._searchForm.querySelector(".search-form__input").value = "";
    // Chama a função para verificar o clima da cidade
    this._checkWeather(query);
  }
}

// Cria uma nova instância da aplicação com a chave da API
const app = new App("YOUR_API_KEY");
