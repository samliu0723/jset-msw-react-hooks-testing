# React + Vite + Jest + MSW1.x + Jsdom + React Testing Library

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Jest setup

For Jest(Javascript and JSX only), you can use the following setup:
https://jestjs.io/docs/tutorial-react
https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd
https://www.youtube.com/watch?v=1ah2jZ9FeQs&list=PLsKJIR9go2Rne6kzKftZxeQHH9HvR0RdV

1. Change .eslintrc.cjs settings, add following rules:

```js
extends: ["react-app", "react-app/jest"],
```

2. install jest and core libraries, add test script in package.json:

```bash
npm install --save-dev jest babel-jest react-test-renderer
```

- babel-jest: A Jest transformer with Babel. It allows Jest to preprocess JavaScript files with Babel before running the tests.
- react-test-renderer: This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

```json
// package.json
"scripts": {
  "test": "jest"
}
```

3. install babel preset and add **.babelrc**(in root folder) for jest to transform JSX:

```bash
npm install --save-dev @babel/preset-env @babel/preset-react
```

```json
// .babelrc
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

4. Add react-testing-library for testing:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

5. To support SVG and CSS files add jest-svg-transformer and identity-obj-proxy. Then add into moduleMapper inside package.json jest config:

```bash
npm install --save-dev jest-svg-transformer identity-obj-proxy
```

```json
// package.json
"jest": {
    "moduleNameMapper": {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    }
  }
```

6. To support web environment API, install jest-environment-jsdom add into jest config:

```bash
npm install --save-dev jest-environment-jsdom
```

```json
// package.json
"jest": {
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    }
  }
```

7. Additionally add @testing-library/jest-dom package and configure **setupTests.js**(in root folder):

```bash
npm install --save-dev @testing-library/jest-dom
```

```js
// setupTests.js
import "@testing-library/jest-dom";
```

```js
// package.json
"jest": {
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    "setupFilesAfterEnv": [
      "<rootDir>/setupTests.js"
    ]
  }
```

8. The package.json should look like this(setup react by vite):

```js
{
  "name": "react-hooks",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "identity-obj-proxy": "^3.0.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-svg-transformer": "^1.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.24.7",
    "@babel/preset-react": "^7.24.7",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "babel-jest": "^29.7.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "jest": "^29.7.0",
    "react-test-renderer": "^18.3.1",
    "vite": "^5.2.0"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    "setupFilesAfterEnv": [
      "<rootDir>/setupTests.js"
    ]
  }
}
```

9. You dont need to import jest to your test files, for intellesense you can install @types/jest

10. The userEvent is not included in the @testing-library/react, you can install @testing-library/user-event to use it.

11. You can create a jest.config.js file to configure jest, it work the same as package.json jest config.
    The file will look like this:

```js
export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
```

it indecate that jest will use jsdom as test environment, and use jest-svg-transformer to transform svg files, and use identity-obj-proxy to transform css files, and use setupTests.js to setup the test environment.

12. For setupTests.js, you can use the following code to setup the test environment:
    the whatwg-fetch is used to polyfill fetch api for jest test, because jsdom does not support fetch api. you need to install it first. you may find other polyfill that need to be added in the future.

```js
import "whatwg-fetch";
import "@testing-library/jest-dom";
```

# Testing

1. run npm test to run jest test

# Mocking

use the msw for mocking https://mswjs.io/docs/integrations/node

1. There are some environment issues with msw2.0 combine with jest
   https://mswjs.io/docs/migrations/1.x-to-2.x#remap-fetch-api-globals
   to soleve it, you need tons of polyfill, so
   I recommend to use msw 1.x for jest testing

2. install msw: npm i msw@1.3.3 --save-dev

3. You can find documentation for msw 1.x here: https://v1.mswjs.io/docs
