# URL Shortner Microservice

Esse projeto é a resolução de um dos 5 desafios finais para a certificação de Back End Development and API's da FreeCodeCamp. Foi utilizado o boilerplate code fornecido pela FreeCodeCamp.

Você pode encontrar o desafio no seguinte link: https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice


## Requisitos

 - [x] You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
 - [x] When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
 - [x] Waiting: If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

## Para executar

```bash
# Clone este repositório
$ git clone https://github.com/elanonc/URL-Shortner-Microservice

# Entre na pasta
$ cd Request URL Shortener Microservice

# crie um arquivo .env e coloque o link para o seu database

# Instale as dependências
$ npm install

# Execute
$ npm run dev
```