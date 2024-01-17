
## Cypress Real-World App (RWA) Playwright Port
This repository hosts a variant of the Cypress Real-World App (RWA), where tests originally written in Cypress located in cypress/tests/ui/auth.spec.ts have been ported to Playwright using TypeScript. The tests are structured using the Page Object Model pattern, offering an organized and maintainable codebase for testing.

## Getting Started

```shell
npm install yarn@latest -g
```

### Installation

```shell
yarn 
```

### Run the app

```shell
yarn dev
```

### Running Playwright Tests

Run all test:

```shell
yarn pw:test
```

Run tests in specific browser in HEADLESS mode:

```shell
yarn pw:chrome:headless
yarn pw:firefox:headless
yarn pw:webkit:headless
```

Run tests in specific browser in HEADED mode:

```shell
yarn pw:chrome
yarn pw:firefox
yarn pw:webkit
```
