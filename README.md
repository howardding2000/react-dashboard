# react-dashboard

react-dashboard is a dashboard build on React

## configration for Ant Design

Ant Design is using Less as the development language for styling. 
So for custemizing AntD theme, first of all we have to import the dependencies of less.
Unfortunately, React natively does not support less, so we have to manually import the dependencies and configure Webpack.

### less support dependencies
- install `less` and `less-loader` to support less
```bash
npm install less less-loader
```
### 3rd-part react webpack config  dependencies
We can use `npm run eject`  to expose the WebPack configuration file,and config less options in webpack.config.js, **but** it's an one way operation. 
I just want to go lightweight custom Webpack, some alternatives are  `react-app-rewired` + `customize-cra` and `@carco/craco` + `craco-less`.

Here I use `customize-cra`(At first, I wanted to use `carco`, which is officially recommended, but I found that the current `@carco/craco` is not fully support CRA V5) and `customize-cra-less-loader`.

- install `react-app-rewired` `customize-cra` `customize-cra-less-loader`
```bash
npm install react-app-rewired customize-cra customize-cra-less-loader
```
### configration of Ant Design Less variables
 the version of dependencies I used are here:
```js
   "devDependencies": {
    "customize-cra": "^1.0.0",
    "customize-cra-less-loader": "^2.0.0",
    "less": "^3.13.1",
    "less-loader": "^7.3.0",
    "react-app-rewired": "^2.2.1"
  }
```
I import `customize-cra-less-loader` to support latest version of `less-loader`.

**Attention**:`addLessLoader` in `customize-cra-less-loader` is a little different of `addLessLoader` in `customize-cra`. **We should wrappe `lessOptions` into `lessLoaderOptions`!**

so the final configration will be like this :

config-overrides.js
```js
const { override } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#DD6B20" },
        //   cssModules: {
        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
        //   },
      },
    },
  })
);
```