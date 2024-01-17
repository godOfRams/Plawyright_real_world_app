
## Getting Started

The Cypress Real-World App (RWA) is a full-stack Express/React application backed by a local JSON database ([lowdb]).
The app is bundled with [example data](./data/database.json) (`data/database.json`) that contains everything you need to start using the app and run tests out-of-the-box.


```shell
npm install yarn@latest -g
```

#### Yarn Modern

**This project is not compatible with [Yarn Modern](https://yarnpkg.com/) (version 2 and later).**

### Installation

```shell
yarn
```

### Run the app

```shell
yarn dev
```

### Start Playwright

### Start Cypress

```shell
yarn cypress:open
```

> 🚩 **Note**
>
> If you have changed the default ports, then you need to update Cypress configuration file (`cypress.config.ts`) locally.
> There are three properties that you need to update in `cypress.config.ts`: `e2e.baseUrl`, `env.apiUrl`, and `env.url`.
> The port number in `e2e.baseUrl` corresponds to `PORT` variable in `.env` file. Similarly, the port number in `env.apiUrl` and `env.url` correspond to `VITE_BACKEND_PORT`.
> For example, if you have changed `PORT` to `13000` and `VITE_BACKEND_PORT` to `13001` in `.env` file, then your `cypress.config.ts` should look similar to the following snippet:
>
> ```js
> {
>   env: {
>     apiUrl: "http://localhost:13001",
>     codeCoverage: {
>       url: "http://localhost:13001/__coverage__"
>     },
>   },
>   e2e: {
>     baseUrl: "http://localhost:13000"
>   }
> }
> ```
>
> Avoid committing the modified `cypress.config.ts` into Git since the CI environments still expect the application to be run on default ports.



Перепиши цей тест для репозиторії зберігаючи як запускати Але щоб опис був англійською з наступного тексту 

Ця репозиторія це варіант тестів з файлу cypress\tests\ui\auth.spec.ts які написала команда сайпрес на фрейморк playwright typescript з використанням pageobject патерну 
  додай також що щоб запустити тести на playwright варто прописати команду 

    "pw:chrome": "npx playwright test --project=chromium --headed",
    "pw:firefox": "npx playwright test --project=firefox --headed",
    "pw:webkit": "npx playwright test --project=webkit --headed",
    "pw:chrome:headless": "npx playwright test --project=chromium",
    "pw:firefox:headless": "npx playwright test --project=firefox",
    "pw:webkit:headless": "npx playwright test --project=webkit",
    "pw:test": "npx playwright test",
    "pw:test:headless": "npx playwright test --headed=false",