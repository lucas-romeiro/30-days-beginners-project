# Weather App

Um aplicativo simples de previsão do tempo que permite aos usuários pesquisar as condições climáticas atuais de uma cidade. O app busca dados de clima usando a [API OpenWeatherMap](https://openweathermap.org/api) e exibe informações como temperatura, umidade, velocidade do vento e condições climáticas.

## Funcionalidades

- Pesquisa de clima por nome da cidade.
- Exibe temperatura, umidade, velocidade do vento e ícone do clima.
- Design responsivo adequado para dispositivos móveis e desktop.
- Exibe uma mensagem de erro caso a cidade não seja encontrada ou se houver problemas com a API.

## Tecnologias Usadas

- **HTML5**: Estrutura e layout do aplicativo.
- **CSS3**: Estilos e layout (usando Flexbox e CSS Grid).
- **JavaScript (ES6+)**: Lógica para lidar com as requisições da API, atualizações da interface e eventos.
- **API OpenWeatherMap**: API de dados meteorológicos.
- **Fetch API**: Para realizar requisições HTTP assíncronas.

## Configuração

Para rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

- Tenha um navegador com suporte a JavaScript.
- Obtenha uma chave de API da [OpenWeatherMap](https://openweathermap.org/api), caso ainda não tenha.

### Passos

1. **Clone o repositório**:

```bash
git clone https://github.com/seuusuario/weather-app.git
cd weather-app
```

2. **Obtenha uma chave de API**:

Vá até OpenWeatherMap e crie uma conta para obter uma chave de API gratuita.

3. **Substitua a chave de API**:

```bash
const app = new App("YOUR_API_KEY"); // Substitua pela sua chave de API
```

4. **Abra o projeto**:

Abra o arquivo index.html em seu navegador.

```bash
open index.html # Ou simplesmente dê um duplo clique no arquivo para abrir no navegador
```

5. **Comece a usar o app**:

Digite o nome de uma cidade na barra de pesquisa e pressione Enter ou clique no botão de pesquisa para ver as informações do clima.

## Como Funciona

1. **Pesquisa**: O usuário digita o nome de uma cidade e pressiona Enter ou clica no botão de pesquisa.
2. **Requisição API**: O app faz uma requisição para a API OpenWeatherMap para obter os dados climáticos atuais para essa cidade.
3. **Exibição dos Dados**: O app exibe os dados de clima, incluindo temperatura, umidade, velocidade do vento e um ícone representando as condições climáticas.
4. **Tratamento de Erros**: Caso uma cidade inválida seja inserida ou haja problemas com a API, uma mensagem de erro será exibida.

## Capturas de Tela

### Contribuição

Fique à vontade para fazer um fork do repositório, criar branches e enviar pull requests. Caso encontre algum problema ou bug, reporte-os na seção Issues.

### Passos para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua funcionalidade/correção: git checkout -b nome-da-feature.
3. Faça as alterações e commit as mudanças: git commit -am 'Adiciona nova funcionalidade'.
4. Envie para sua branch: git push origin nome-da-feature.
5. Envie um pull request com uma descrição clara das suas mudanças.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Agradecimentos

O app utiliza dados da API OpenWeatherMap.
Ícones e assets usados para representação visual são provenientes de sites de ícones gratuitos.
